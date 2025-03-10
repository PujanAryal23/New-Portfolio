import { Github, Linkedin, Mail, Send, FileText } from 'lucide-react';
import { useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

const ContactSection = () => {
  const pdfRef = useRef<HTMLDivElement>(null);

  // Function to capture a specific section and download as PDF
  const downloadPDF = async () => {
    const element = document.getElementById('website-content'); // Capture specific section using ID

    if (!element) return;

    // Use html2canvas to capture the content as a canvas
    const canvas = await html2canvas(element, {
      scale: 2, // Increase scale for higher resolution
      logging: false, // Disable logging to avoid console clutter
      useCORS: true, // Enable cross-origin image rendering if needed
    });

    const imgData = canvas.toDataURL('image/png'); // Convert canvas to image
    const pdf = new jsPDF('p', 'mm', 'a4'); // Create a new PDF document
    const imgWidth = 210; // A4 width in mm
    const pageHeight = 297; // A4 height in mm
    const imgHeight = (canvas.height * imgWidth) / canvas.width; // Calculate image height based on the aspect ratio

    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight); // Add the first page
    heightLeft -= pageHeight;

    // Add more pages if needed
    while (heightLeft > 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save('Pujan-Resume.pdf'); // Save the PDF
  };

  return (
    <section ref={pdfRef} id="website-content" className="py-20 relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-72 h-72 bg-primary/30 rounded-full filter blur-3xl opacity-10"></div>
        <div className="absolute bottom-0 left-0 w-72 h-72 bg-accent/20 rounded-full filter blur-3xl opacity-10"></div>
      </div>

      <div className="container mx-auto px-4">
        <div className="mb-12 text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4 text-gradient">Get In Touch</h2>
          <div className="h-1 w-20 bg-primary rounded-full mx-auto mb-8"></div>
          <p className="text-gray-300">
            Feel free to reach out for opportunities, collaborations, or just to say hello!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
          <div className="lg:col-span-2 space-y-8">
            <div className="glass-card p-6 rounded-xl animate-fade-in">
              <h3 className="text-xl font-semibold mb-6">Connect With Me</h3>

              <div className="space-y-6">
                <a
                  href="mailto:aryalpujan@gmail.com" 
                  className="flex items-center p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors gap-4 group"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 group-hover:bg-blue-500/20 transition-colors">
                    <Mail size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-200">Email</h4>
                    <p className="text-gray-400 text-sm">aryalpujan@gmail.com</p>
                  </div>
                </a>

                <a
                  href="https://www.linkedin.com/in/pujan-aryal-548786136/"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors gap-4 group"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-600/10 text-blue-600 group-hover:bg-blue-600/20 transition-colors">
                    <Linkedin size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-200">LinkedIn</h4>
                    <p className="text-gray-400 text-sm">Connect Professionally</p>
                  </div>
                </a>

                <a
                  href="https://github.com/PujanAryal23/"
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors gap-4 group"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-slate-500/10 text-slate-500 group-hover:bg-slate-500/20 transition-colors">
                    <Github size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-200">GitHub</h4>
                    <p className="text-gray-400 text-sm">Check My Projects</p>
                  </div>
                </a>

                <a
                  href="#" 
                  onClick={(e) => { e.preventDefault(); downloadPDF(); }} // 🟢 Integrating PDF download function
                  className="flex items-center p-4 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors gap-4 group w-full text-left"
                >
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500/20 transition-colors">
                    <FileText size={20} />
                  </div>
                  <div>
                    <h4 className="font-medium text-gray-200">Resume</h4>
                    <p className="text-gray-400 text-sm">Download PDF Version</p>
                  </div>
                </a>
              </div>
            </div>
          </div>

          <div className="lg:col-span-3">
            <div className="glass-card p-6 md:p-8 rounded-xl animate-fade-in animate-delay-200">
              <h3 className="text-xl font-semibold mb-6">Send a Message</h3>

              <form className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-gray-300">Name</label>
                    <input type="text" id="name" className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-white/5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Your Name" />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-gray-300">Email</label>
                    <input type="email" id="email" className="w-full px-4 py-3 rounded-lg bg-slate-800/50 border border-white/5 focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary" placeholder="Your Email" />
                  </div>
                </div>

                <button type="submit" className="w-full md:w-auto inline-flex items-center justify-center px-6 py-3 rounded-lg bg-primary hover:bg-primary/90 transition-colors text-white font-medium">
                  <Send size={18} className="mr-2" />
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;