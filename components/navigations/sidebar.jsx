'use client'
import React, { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { SidebarClose, SidebarOpen } from "lucide-react";
import { motion, AnimatePresence, LayoutGroup } from "framer-motion";
import AddContactDialog from "@/components/dialogs/add-contact";
import AddAddressDialog from "@/components/dialogs/add-address";
import AddDocumentDialog from "@/components/dialogs/add-document";
import ProfileTabs from "./profile-tabs";

const Sidebar = () => {
  const [expanded, setExpanded] = useState(true);
  const [openDialog, setOpenDialog] = useState({
    contact: false,
    address: false,
    document: false
  });

  const toggleExpand = () => {
    setExpanded(!expanded);
  };

  const handleOpenDialog = (dialogType) => {
    setOpenDialog(prev => ({ ...prev, [dialogType]: true }));
  };

  const handleCloseDialog = (dialogType) => {
    setOpenDialog(prev => ({ ...prev, [dialogType]: false }));
  };

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
        className="bg-muted p-4 flex flex-col gap-6 h-full overflow-hidden sidebar rounded-2xl"
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
                <motion.p variants={profileItemVariants} className="text-xl font-bold">
                  John Deo
                </motion.p>
                <motion.p variants={profileItemVariants} className="flex items-center gap-2 text-xs">
                  <span>Date of Birth:</span>
                  <span className="font-semibold">2 May 1987</span>
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence mode="wait">
          <ProfileTabs 
            expanded={expanded}
            contentVariants={contentVariants}
            handleOpenDialog={handleOpenDialog}
          />
        </AnimatePresence>

      </motion.aside>
    </LayoutGroup>
  );
};

export default Sidebar;