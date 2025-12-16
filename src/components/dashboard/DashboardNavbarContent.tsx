'use client'
import { NavSection } from "@/types/dashboard.interface";
import { IUser } from "@/types/userTypes";
import { Menu, Search } from "lucide-react";
import { Input } from "../ui/input";
import UserDropdown from "./UserDropdown";
import { ModeToggle } from "../ModeToggle";
import { Sheet, SheetContent, SheetTrigger } from "../ui/sheet";
import { Button } from "../ui/button";
import { useEffect, useState } from "react";
import DashboardMobileSidebar from "./DashboardMobileSidebar";

interface Props {
    user: IUser;
    navItems?: NavSection[];
    dashboardHome?: string;
}

const DashboardNavbarContent = ({ user, navItems, dashboardHome }: Props) => {

    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [aiDialogOpen, setAiDialogOpen] = useState(false);

    useEffect(() => {
        const checkSmallerScreen = () => {
            setIsMobile(window.innerWidth < 768);
        };

        checkSmallerScreen();
        window.addEventListener("resize", checkSmallerScreen);

        return () => {
            window.removeEventListener("resize", checkSmallerScreen);
        };
    }, []);

    const handleSearchKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && searchQuery.trim()) {
      setAiDialogOpen(true);
    }
  };

  const handleSearchIconClick = () => {
    if (searchQuery.trim()) {
      setAiDialogOpen(true);
    }
  };

    return (
        <div>
            <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
                <div className="flex h-16 items-center justify-between gap-4 px-4 md:px-6">
                    {/* Mobile Menu Toggle */}
                   <Sheet open={isOpen} onOpenChange={setIsOpen}> {/* ⬅️ FIXED HERE */}
                        <SheetTrigger asChild className="lg:hidden">
                            <Button variant="outline" size="icon">
                                <Menu className="h-5 w-5" />
                            </Button>
                        </SheetTrigger>
                        
                        {/* Hide the overlay on medium and larger screens */}
                        <SheetContent side="left" className="w-64 p-0">
                            <DashboardMobileSidebar
                                user={user}
                                navItems={navItems || []}
                                dashboardHome={dashboardHome || ""}
                            />
                        </SheetContent>
                    </Sheet>

                    {/* Search Bar & AI Search */}
                    <div className="flex-1 flex items-center justify-end gap-2">
                        {/* Search Input */}
                        <div className="relative w-full hidden sm:block">
                            <Search
                                className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground cursor-pointer"
                              onClick={handleSearchIconClick}
                            />
                            <Input
                                type="text"
                                placeholder="Search your thought..."
                                className="pl-9 pr-4"
                              value={searchQuery}
                              onChange={(e) => setSearchQuery(e.target.value)}
                              onKeyDown={handleSearchKeyDown}
                            />
                        </div>

                        {/* AI Search Dialog */}
                        {/* <AISearchDialog
            initialSymptoms={searchQuery}
            externalOpen={aiDialogOpen}
            onOpenChange={(open) => {
              setAiDialogOpen(open);
              if (!open) setSearchQuery("");
            }}
            onSearchComplete={() => setSearchQuery("")}
          /> */}
                    </div>

                    <div className="flex items-center gap-4">
                        <UserDropdown user={user} />
                        <ModeToggle></ModeToggle>
                    </div>

                </div>
            </header>
        </div>
    );
};

export default DashboardNavbarContent;