import { Link } from "wouter";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <div className="mb-4">
              <span className="text-2xl font-bold font-heading">Meme<span className="text-primary">Mates</span></span>
            </div>
            <p className="text-neutral-400 text-sm mb-4">
              Transforming social connections through the universal language of memes.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-neutral-400 hover:text-white">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <i className="fab fa-tiktok"></i>
              </a>
              <a href="#" className="text-neutral-400 hover:text-white">
                <i className="fab fa-linkedin"></i>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Our Apps</h3>
            <ul className="space-y-2">
              <li><a href="#apps" className="text-neutral-400 hover:text-white">MemeSpace</a></li>
              <li><a href="#apps" className="text-neutral-400 hover:text-white">MeetQ</a></li>
              <li><a href="#apps" className="text-neutral-400 hover:text-white">App Features</a></li>
              <li><a href="#roadmap" className="text-neutral-400 hover:text-white">Roadmap</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white">Blog</a></li>
              <li><a href="#research" className="text-neutral-400 hover:text-white">Research</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">Press Kit</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">Careers</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white">Terms of Service</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">Privacy Policy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">Cookie Policy</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white">Community Guidelines</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 mt-10 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-neutral-400 text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} MemeMates. All rights reserved.
          </p>
          <div>
            <a href="#" className="text-neutral-400 hover:text-white text-sm mx-3">Terms</a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm mx-3">Privacy</a>
            <a href="#" className="text-neutral-400 hover:text-white text-sm mx-3">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
