import os
import sys
import Quartz
from Cocoa import NSURL
import Vision
import objc

def ocr_pdf(pdf_path, txt_path):
    print(f"Starting OCR on: {pdf_path}")
    url = NSURL.fileURLWithPath_(pdf_path)
    doc = Quartz.PDFDocument.alloc().initWithURL_(url)
    if not doc:
        print(f"Error: Failed to load PDF {pdf_path}")
        return False
        
    num_pages = doc.pageCount()
    print(f"Total pages: {num_pages}")
    
    # Setup Vision request
    results = []
    
    for i in range(num_pages):
        page_results = []
        def handler(request, error):
            if error:
                print(f"Vision error on page {i+1}: {error}")
                return
            for observation in request.results():
                candidates = observation.topCandidates_(1)
                if candidates:
                    page_results.append(candidates[0].string())
                    
        page = doc.pageAtIndex_(i)
        rect = page.boundsForBox_(0)
        width, height = rect.size.width, rect.size.height
        
        # Scale factor
        scale = 2.0
        w = int(width * scale)
        h = int(height * scale)
        
        color_space = Quartz.CGColorSpaceCreateWithName(Quartz.kCGColorSpaceSRGB)
        context = Quartz.CGBitmapContextCreate(
            None, w, h, 8, 0, color_space,
            Quartz.kCGImageAlphaPremultipliedLast
        )
        if not context:
            print(f"Failed to create bitmap context for page {i+1}")
            continue
            
        Quartz.CGContextScaleCTM(context, scale, scale)
        page.drawWithBox_toContext_(0, context)
        
        cg_image = Quartz.CGBitmapContextCreateImage(context)
        if not cg_image:
            print(f"Failed to create CGImage for page {i+1}")
            continue
            
        request = Vision.VNRecognizeTextRequest.alloc().initWithCompletionHandler_(handler)
        request.setRecognitionLevel_(Vision.VNRequestTextRecognitionLevelAccurate)
        request.setUsesLanguageCorrection_(True)
        request.setRecognitionLanguages_(["it-IT", "en-US"])
        
        handler_obj = Vision.VNImageRequestHandler.alloc().initWithCGImage_options_(cg_image, None)
        success, error = handler_obj.performRequests_error_([request], None)
        
        if not success:
            print(f"Vision failed on page {i+1}: {error}")
            
        page_text = "\n".join(page_results)
        results.append(f"--- PAGE {i+1} ---\n{page_text}")
        print(f"  Page {i+1}/{num_pages} processed... ({len(page_text)} chars)")
        
    # Save output
    os.makedirs(os.path.dirname(txt_path), exist_ok=True)
    with open(txt_path, "w", encoding="utf-8") as f:
        f.write("\n\n".join(results))
    print(f"Saved text to: {txt_path}\n")
    return True

def main():
    # Set directory to the script's folder to run relatively
    script_dir = os.path.dirname(os.path.abspath(__file__))
    os.chdir(script_dir)

    pdf_files = sorted([f for f in os.listdir('.') if f.endswith('.pdf')])
    print(f"Found {len(pdf_files)} PDF files to process in storia_arte.")
    
    success_count = 0
    for pdf in pdf_files:
        txt_name = os.path.splitext(pdf)[0] + ".txt"
        txt_path = os.path.join("extracted_text", txt_name)
        
        if os.path.exists(txt_path):
            print(f"Skipping {pdf} (already processed at {txt_path})")
            success_count += 1
            continue
            
        if ocr_pdf(pdf, txt_path):
            success_count += 1
            
    print(f"Finished. Successfully processed {success_count}/{len(pdf_files)} PDFs.")

if __name__ == "__main__":
    main()
