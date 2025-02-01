"use client";
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CirclePlus, SidebarClose, SidebarOpen } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import SidebarContactCard from "@/components/cards/sidebar-contact-card";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  // Main container animation
  const containerVariants = {
    expanded: {
      width: "24rem",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 30,
        mass: 1,
      },
    },
    collapsed: {
      width: "4rem",
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 30,
        mass: 1,
      },
    },
  };

  // Profile section animations with stagger effect
  const profileVariants = {
    expanded: {
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
    collapsed: {
      transition: {
        staggerChildren: 0.05,
        staggerDirection: -1,
      },
    },
  };

  const profileItemVariants = {
    expanded: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
    collapsed: {
      opacity: 0,
      y: 10,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 25,
      },
    },
  };

  // Content section animations
  const contentVariants = {
    expanded: {
      opacity: 1,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
        delay: 0.2,
      },
    },
    collapsed: {
      opacity: 0,
      scale: 0.95,
      transition: {
        type: "spring",
        stiffness: 200,
        damping: 20,
      },
    },
  };

  return (
    <LayoutGroup>
      <motion.aside
        layout
        className="bg-muted  p-4 flex flex-col gap-6 h-full overflow-hidden sidebar"
        variants={containerVariants}
        initial="collapsed"
        animate={expanded ? "expanded" : "collapsed"}
      >
        <motion.div layout className="flex items-center justify-end">
          <Button
            className="size-8 bg-background text-foreground hover:bg-secondary"
            onClick={toggleExpand}
          >
            <motion.div
              initial={false}
              animate={{ rotate: expanded ? 0 : 360 }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
            >
              {expanded ? <SidebarClose /> : <SidebarOpen />}
            </motion.div>
          </Button>
        </motion.div>

        <motion.div
          layout
          variants={profileVariants}
          className="flex items-center flex-col justify-center gap-3"
        >
          <motion.div
            layout
            className="relative"
            animate={{
              width: expanded ? "6rem" : "2.5rem",
              height: expanded ? "6rem" : "2.5rem",
              rotate: expanded ? 0 : 360,
            }}
            transition={{ type: "spring", stiffness: 200, damping: 25 }}
          >
            <Avatar className="w-full h-full">
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </motion.div>

          <AnimatePresence mode="wait">
            {expanded && (
              <motion.div
                variants={profileItemVariants}
                initial="collapsed"
                animate="expanded"
                exit="collapsed"
                className="flex flex-col items-center gap-2"
              >
                <motion.p
                  variants={profileItemVariants}
                  className="text-xl font-bold"
                >
                  John Deo
                </motion.p>
                <motion.p
                  variants={profileItemVariants}
                  className="flex items-center gap-2 text-xs"
                >
                  <span>Date of Birth:</span>
                  <span className="font-semibold">2 May 1987</span>
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          {expanded && (
            <motion.div
              variants={contentVariants}
              initial="collapsed"
              animate="expanded"
              exit="collapsed"
              className="w-full h-full"
            >
              <Tabs defaultValue="Contact" className="w-full h-full">
                <Card className=" bg-popover rounded-lg min-h-96 h-full flex flex-col justify-between p-0 overflow-hidden">
                  <CardHeader className="p-2 border-b">
                    <TabsList className="w-full bg-transparent">
                      <TabsTrigger
                        value="Contact"
                        className="w-full data-[state=active]:bg-foreground data-[state=active]:text-background"
                      >
                        Contact
                      </TabsTrigger>
                      <TabsTrigger
                        value="Address"
                        className="w-full data-[state=active]:bg-foreground data-[state=active]:text-background"
                      >
                        Address
                      </TabsTrigger>
                      <TabsTrigger
                        value="Documents"
                        className="w-full data-[state=active]:bg-foreground data-[state=active]:text-background"
                      >
                        Documents
                      </TabsTrigger>
                    </TabsList>
                  </CardHeader>

                  <CardContent className="p-2 flex-1">
                    <TabsContent
                      value="Contact"
                      className="h-full flex flex-col gap-2"
                    >
                      <SidebarContactCard />
                      <SidebarContactCard />
                    </TabsContent>
                    <TabsContent value="Address" className="h-full">
                      Change your Address here.
                    </TabsContent>
                    <TabsContent value="Documents" className="h-full">
                      Change your Documents here.
                    </TabsContent>
                  </CardContent>

                  <CardFooter className="p-2">
                    <Button className="w-full">
                      <CirclePlus />
                      Add Contact
                    </Button>
                  </CardFooter>
                </Card>
              </Tabs>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.aside>
    </LayoutGroup>
  );
};

export default Sidebar;
