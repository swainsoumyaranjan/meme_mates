import { motion, useAnimation, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { apiRequest } from "@/lib/queryClient";
import { toast } from "@/hooks/use-toast";
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';

// Type for uploaded files
type UploadedFile = {
  id: string;
  filename: string;
  originalName: string;
  path: string;
  mimeType: string;
  size: number;
  type: 'pdf' | 'document' | 'image';
};

// Type for mood board items
type MoodBoardItem = {
  id: string;
  type: 'image' | 'file' | 'emoji' | 'text';
  content: string;
  caption?: string;
  category?: string;
};

export default function MoodBoardSection() {
  const controls = useAnimation();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
  const [userMoodBoard, setUserMoodBoard] = useState<MoodBoardItem[]>([]);
  const [selectedEmoji, setSelectedEmoji] = useState<string>("");
  const [caption, setCaption] = useState("");
  const [category, setCategory] = useState("Visual Inspiration");
  const [activeTab, setActiveTab] = useState("upload");
  const [isUploading, setIsUploading] = useState(false);
  
  useEffect(() => {
    if (isInView) {
      controls.start("visible");
    }
  }, [controls, isInView]);
  
  // Handle file upload
  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    
    // Create form data
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      setIsUploading(true);
      
      // Upload file to server
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
        // Don't set Content-Type header, browser will set it with boundary
      });
      
      if (!response.ok) {
        throw new Error(`Upload failed: ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.success) {
        // Determine file type
        let fileType: 'pdf' | 'document' | 'image' = 'document';
        if (file.type.includes('pdf')) {
          fileType = 'pdf';
        } else if (file.type.includes('image')) {
          fileType = 'image';
        }
        
        // Add to uploaded files
        const newFile: UploadedFile = {
          id: Date.now().toString(),
          filename: data.file.filename,
          originalName: data.file.originalName,
          path: data.file.path,
          mimeType: data.file.mimeType,
          size: data.file.size,
          type: fileType
        };
        
        setUploadedFiles(prev => [...prev, newFile]);
        
        // Add to mood board
        const newItem: MoodBoardItem = {
          id: Date.now().toString(),
          type: fileType === 'image' ? 'image' : 'file',
          content: data.file.path,
          caption: caption || data.file.originalName,
          category: category
        };
        
        setUserMoodBoard(prev => [...prev, newItem]);
        
        toast({
          title: "Success!",
          description: "File uploaded to your mood board."
        });
        
        // Reset form
        setCaption("");
        event.target.value = '';
      }
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Upload Failed",
        description: "There was a problem uploading your file.",
        variant: "destructive"
      });
    } finally {
      setIsUploading(false);
    }
  };
  
  // Handle emoji selection
  const handleEmojiSelect = (emoji: any) => {
    setSelectedEmoji(emoji.native);
  };
  
  // Add emoji to mood board
  const addEmojiToMoodBoard = () => {
    if (!selectedEmoji) return;
    
    const newItem: MoodBoardItem = {
      id: Date.now().toString(),
      type: 'emoji',
      content: selectedEmoji,
      caption: caption || 'Emoji Expression',
      category: category
    };
    
    setUserMoodBoard(prev => [...prev, newItem]);
    toast({
      title: "Success!",
      description: "Emoji added to your mood board."
    });
    
    // Reset form
    setSelectedEmoji("");
    setCaption("");
    setIsDialogOpen(false);
  };
  
  // Handle text note addition
  const addTextNote = (note: string) => {
    if (!note.trim()) return;
    
    const newItem: MoodBoardItem = {
      id: Date.now().toString(),
      type: 'text',
      content: note,
      category: 'Notes'
    };
    
    setUserMoodBoard(prev => [...prev, newItem]);
    toast({
      title: "Note Added",
      description: "Your inspiration note has been added."
    });
  };
  
  const fadeInVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.15,
        duration: 0.5,
        ease: "easeOut"
      }
    })
  };

  // Image data for the mood board
  const moodBoardImages = [
    {
      url: "https://images.unsplash.com/photo-1517457373958-b7bdd4587205?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Colorful abstract design",
      category: "Visual Identity"
    },
    {
      url: "https://images.unsplash.com/photo-1523895665936-7bfe172b757d?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Vibrant color palette",
      category: "Color Scheme"
    },
    {
      url: "https://images.unsplash.com/photo-1511467687858-23d96c32e4ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Mobile UI patterns",
      category: "UI Patterns"
    },
    {
      url: "https://images.unsplash.com/photo-1543589077-47d81606c1bf?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Typography samples",
      category: "Typography"
    },
    {
      url: "https://images.unsplash.com/photo-1518770660439-4636190af475?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Social media elements",
      category: "Social Elements"
    },
    {
      url: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&h=400",
      alt: "Gradients and transitions",
      category: "Color Transitions"
    }
  ];

  return (
    <section id="mood-board" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div 
          className="text-center mb-16"
          initial="hidden"
          animate={controls}
          variants={fadeInVariants}
          custom={0}
        >
          <h2 className="text-3xl md:text-4xl font-bold font-heading mb-4">Design <span className="text-primary">Inspiration</span></h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-6"></div>
          <p className="text-lg text-neutral-600 max-w-3xl mx-auto">
            Visual identity elements that shape the MemeMates experience
          </p>
        </motion.div>
        
        <div className="mb-12">
          <motion.div 
            className="bg-neutral-50 rounded-lg p-6 md:p-8 border border-neutral-200"
            initial="hidden"
            animate={controls}
            variants={fadeInVariants}
            custom={1}
          >
            <div className="flex flex-col md:flex-row items-start md:items-center mb-8">
              <div className="bg-primary/10 p-4 rounded-full mb-4 md:mb-0 md:mr-6">
                <i className="fas fa-palette text-primary text-2xl"></i>
              </div>
              <div>
                <h3 className="text-2xl font-bold font-heading mb-2">Design Philosophy</h3>
                <p className="text-neutral-600">
                  Our design approach focuses on vibrant, playful aesthetics that reflect meme culture while maintaining intuitive usability and accessibility.
                </p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <h4 className="font-bold mb-2 flex items-center">
                  <i className="fas fa-paint-brush text-primary mr-2"></i>
                  Color Psychology
                </h4>
                <p className="text-sm text-neutral-600">
                  Primary orange conveys energy and creativity, while secondary purple adds depth and innovation to our visual language.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <h4 className="font-bold mb-2 flex items-center">
                  <i className="fas fa-font text-primary mr-2"></i>
                  Typography
                </h4>
                <p className="text-sm text-neutral-600">
                  Modern, clean fonts that prioritize readability while adding personality through strategic weight variations.
                </p>
              </div>
              
              <div className="bg-white p-4 rounded-lg border border-neutral-200">
                <h4 className="font-bold mb-2 flex items-center">
                  <i className="fas fa-object-group text-primary mr-2"></i>
                  Iconography
                </h4>
                <p className="text-sm text-neutral-600">
                  Playful yet clear iconography that guides users through interactions with intuitive visual cues.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
        
        <motion.div
          initial="hidden"
          animate={controls}
          variants={fadeInVariants}
          custom={2}
        >
          <h3 className="text-2xl font-bold font-heading mb-6">Mood Board</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {moodBoardImages.map((image, index) => (
              <motion.div 
                key={index}
                className="group relative overflow-hidden rounded-lg shadow-sm hover:shadow-md transition-shadow"
                initial="hidden"
                animate={controls}
                variants={fadeInVariants}
                custom={index + 3}
                whileHover={{ y: -5 }}
                transition={{ duration: 0.2 }}
              >
                <img 
                  src={image.url} 
                  alt={image.alt}
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end">
                  <div className="w-full p-4">
                    <span className="bg-white/90 rounded-full px-3 py-1 text-sm font-medium text-primary inline-block">
                      {image.category}
                    </span>
                    <p className="text-white mt-2">{image.alt}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
          {/* User Contributions Section */}
          {userMoodBoard.length > 0 && (
            <motion.div 
              className="mt-12"
              initial="hidden"
              animate={controls}
              variants={fadeInVariants}
              custom={9}
            >
              <h3 className="text-2xl font-bold font-heading mb-6">Your Inspiration</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {userMoodBoard.map((item, index) => (
                  <motion.div
                    key={item.id}
                    className="bg-white rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow border border-neutral-200"
                    initial="hidden"
                    animate={controls}
                    variants={fadeInVariants}
                    custom={index + 10}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.type === 'image' && (
                      <div className="relative h-52">
                        <img 
                          src={item.content} 
                          alt={item.caption || 'User image'} 
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}
                    
                    {item.type === 'file' && (
                      <div className="h-52 bg-neutral-100 flex items-center justify-center">
                        <div className="text-center p-6">
                          <div className="w-16 h-16 flex items-center justify-center mx-auto mb-2 bg-primary/10 rounded-full">
                            {item.content.includes('.pdf') ? (
                              <i className="fas fa-file-pdf text-primary text-2xl"></i>
                            ) : (
                              <i className="fas fa-file-word text-blue-500 text-2xl"></i>
                            )}
                          </div>
                          <p className="text-neutral-600 truncate max-w-full">{item.caption}</p>
                          <a 
                            href={item.content} 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            className="text-primary hover:underline text-sm mt-2 inline-block"
                          >
                            View Document
                          </a>
                        </div>
                      </div>
                    )}
                    
                    {item.type === 'emoji' && (
                      <div className="h-52 bg-neutral-50 flex items-center justify-center">
                        <div className="text-center">
                          <div className="text-7xl mb-4">{item.content}</div>
                          <p className="text-neutral-600 px-4">{item.caption}</p>
                        </div>
                      </div>
                    )}
                    
                    {item.type === 'text' && (
                      <div className="h-52 bg-neutral-50 flex items-center justify-center p-4">
                        <div className="text-center">
                          <i className="fas fa-quote-left text-primary/30 text-4xl mb-2"></i>
                          <p className="text-neutral-700 italic">{item.content}</p>
                        </div>
                      </div>
                    )}
                    
                    <div className="p-4">
                      <span className="bg-primary/10 rounded-full px-3 py-1 text-xs font-medium text-primary inline-block">
                        {item.category || 'Inspiration'}
                      </span>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
          
          {/* Add to Mood Board Button */}
          <motion.div 
            className="flex justify-center mt-10"
            initial="hidden"
            animate={controls}
            variants={fadeInVariants}
            custom={9.5}
          >
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button size="lg" className="flex items-center gap-2">
                  <i className="fas fa-plus"></i>
                  Add to Mood Board
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Add to Your Mood Board</DialogTitle>
                </DialogHeader>
                
                <Tabs value={activeTab} onValueChange={setActiveTab} className="mt-4">
                  <TabsList className="grid grid-cols-3 mb-4">
                    <TabsTrigger value="upload">Upload</TabsTrigger>
                    <TabsTrigger value="emoji">Emoji</TabsTrigger>
                    <TabsTrigger value="text">Text Note</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="upload" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="file">Upload Image or Document</Label>
                      <Input 
                        id="file" 
                        type="file" 
                        onChange={handleFileUpload} 
                        accept="image/*, application/pdf, application/msword, application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                        disabled={isUploading}
                      />
                      <p className="text-sm text-neutral-500">
                        Supported formats: Images, PDF, Word documents
                      </p>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="caption">Caption (Optional)</Label>
                      <Input 
                        id="caption" 
                        value={caption} 
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="Add a caption for your file"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <select 
                        id="category" 
                        value={category} 
                        onChange={(e) => setCategory(e.target.value)}
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                      >
                        <option value="Visual Inspiration">Visual Inspiration</option>
                        <option value="UI Patterns">UI Patterns</option>
                        <option value="Typography">Typography</option>
                        <option value="Color Palette">Color Palette</option>
                        <option value="User Experience">User Experience</option>
                        <option value="Meme Style">Meme Style</option>
                      </select>
                    </div>
                    
                    {isUploading && (
                      <div className="flex justify-center py-2">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary"></div>
                      </div>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="emoji" className="space-y-4">
                    <div className="space-y-2">
                      <Label>Select an Emoji</Label>
                      <div className="border rounded-lg p-2 bg-white h-64 overflow-y-auto">
                        <Picker 
                          data={data} 
                          onEmojiSelect={handleEmojiSelect}
                          theme="light"
                        />
                      </div>
                      
                      {selectedEmoji && (
                        <div className="flex justify-center p-4 bg-neutral-50 rounded-lg mt-2">
                          <span className="text-4xl">{selectedEmoji}</span>
                        </div>
                      )}
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="emoji-caption">Caption (Optional)</Label>
                      <Input 
                        id="emoji-caption" 
                        value={caption} 
                        onChange={(e) => setCaption(e.target.value)}
                        placeholder="What does this emoji express?"
                      />
                    </div>
                    
                    <Button 
                      onClick={addEmojiToMoodBoard} 
                      disabled={!selectedEmoji}
                      className="w-full"
                    >
                      Add Emoji to Mood Board
                    </Button>
                  </TabsContent>
                  
                  <TabsContent value="text" className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="note">Inspiration Note</Label>
                      <textarea 
                        id="note" 
                        className="flex h-32 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 resize-none"
                        placeholder="Add an inspiration note, quote, or idea..."
                      ></textarea>
                    </div>
                    
                    <Button 
                      onClick={() => {
                        const textarea = document.getElementById('note') as HTMLTextAreaElement;
                        if (textarea && textarea.value) {
                          addTextNote(textarea.value);
                          textarea.value = '';
                          setIsDialogOpen(false);
                        }
                      }}
                      className="w-full"
                    >
                      Add Note to Mood Board
                    </Button>
                  </TabsContent>
                </Tabs>
              </DialogContent>
            </Dialog>
          </motion.div>
        </motion.div>
        
        <motion.div 
          className="mt-16 flex justify-center"
          initial="hidden"
          animate={controls}
          variants={fadeInVariants}
          custom={10}
        >
          <div className="bg-neutral-800 text-white p-4 sm:p-6 rounded-lg max-w-3xl">
            <h4 className="font-bold mb-3 text-lg flex items-center">
              <i className="fas fa-lightbulb text-yellow-400 mr-3"></i>
              Design Principles
            </h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3">
                <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="fas fa-user-friends text-primary"></i>
                </div>
                <p className="text-sm font-medium">User-Centric</p>
              </div>
              
              <div className="text-center p-3">
                <div className="w-12 h-12 bg-blue-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="fas fa-universal-access text-blue-400"></i>
                </div>
                <p className="text-sm font-medium">Accessible</p>
              </div>
              
              <div className="text-center p-3">
                <div className="w-12 h-12 bg-green-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="fas fa-laugh-beam text-green-400"></i>
                </div>
                <p className="text-sm font-medium">Playful</p>
              </div>
              
              <div className="text-center p-3">
                <div className="w-12 h-12 bg-purple-400/20 rounded-full flex items-center justify-center mx-auto mb-2">
                  <i className="fas fa-bolt text-purple-400"></i>
                </div>
                <p className="text-sm font-medium">Dynamic</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}