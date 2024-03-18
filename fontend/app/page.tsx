import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { AppleIcon, InfoIcon, MenuSquare, MoreHorizontal, PlusIcon, Webhook, X } from "lucide-react";

export default function Home() {
  const listProjects = [
    {
      title: "Paperless Office",
      publicName: "paperless-office",
      platforms: {
        android: true,
        web: true,
        ios: true,
        mutliplaform: true
      }
    },
    {
      title: "Paperless Office",
      publicName: "paperless-office",
      platforms: {
        android: true,
        web: true,
        ios: true,
        mutliplaform: true
      }
    },
    {
      title: "Paperless Office",
      publicName: "paperless-office",
      platforms: {
        android: false,
        web: false,
        ios: false,
        mutliplaform: true
      }
    },
    {
      title: "Paperless Office",
      publicName: "paperless-office",
      platforms: {
        android: false,
        web: true,
        ios: true,
        mutliplaform: false
      }
    },
    {
      title: "Paperless Office",
      publicName: "paperless-office",
      platforms: {
        android: false,
        web: true,
        ios: false,
        mutliplaform: false
      }
    }
  ]

  const loggedin = {
    loggedIn: true,
  }
  return (
    <section className="flex flex-col items-center justify-center h-full w-screen">
      {loggedin.loggedIn ? (
        <div className="flex flex-col gap-5 w-full  px-5 md:px-72">
          <Label className="text-2xl font-black">Your Therus Projects</Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <Drawer>
              <DrawerTrigger>
                <Card className="flex flex-col col-span-1 h-[180px] hover:bg-accent">
                  <CardContent className="flex flex-col gap-2 justify-center h-full items-center p-5">
                    <PlusIcon className="h-10 w-10" />
                    <Label className="text-lg font-black">Add project</Label>
                  </CardContent>
                </Card>
              </DrawerTrigger>

              <DrawerContent className="w-screen h-screen px-5 md:px-32">
                <DrawerHeader className="flex flex-row gap-3 items-center justify-start  md:mt-20">
                  <DrawerClose>
                    <X />
                  </DrawerClose>
                  <DrawerTitle className="text-lg md:text-2xl font-light">Create a project (Step 1 of 3)</DrawerTitle>
                </DrawerHeader>

                <div className="flex flex-col gap-5 mt-6 px-5 md:px-20">
                  <Label className="flex flex-row gap-2 text-lg md:text-5xl font-bold md:w-[580px]">
                    Let`s start with a name for your project
                    <InfoIcon />
                  </Label>

                  <Input
                    placeholder="Enter your project name"
                    className="rounded-[10px] md:w-[450px]" />

                  <Button size="sm" variant="outline" className="rounded-full w-fit">my-awesome-project-id</Button>

                  <Button size="lg" variant="secondary" className="rounded-full w-fit">Continue</Button>
                </div>
              </DrawerContent>
            </Drawer>

            {listProjects.map((item, index) => (
              <Card key={index} className="flex flex-col col-span-1 h-[180px] hover:bg-accent">
                <CardContent className="flex flex-col h-full justify-between p-5">
                  <div className="flex flex-col">
                    <Label className="flex text-lg font-black">{item.title}</Label>
                    <Label className="flex text-sm font-light">{item.publicName || item.title}</Label>
                  </div>

                  <div className="flex flex-row gap-2">
                    {item.platforms.android ? (<MoreHorizontal />) : ("")}
                    {item.platforms.ios ? (<AppleIcon />) : ("")}
                    {item.platforms.web ? (<Webhook />) : ("")}
                    {item.platforms.mutliplaform ? (<MenuSquare />) : ("")}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      ) : (
        <div className="flex flex-col w-full md:max-w-sm px-5 md:px-0">
          <Card className="flex flex-col">
            <CardHeader className="flex flex-col items-center justify-center">
              <Avatar className="h-32 w-32">
                <AvatarImage src="https://github.com/shadcn.png" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </CardHeader>
            <CardContent className="flex flex-col gap-2">
              <Input
                type="email"
                placeholder="Email Address"
                className="rounded-full" />
              <Input
                type="password"
                placeholder="Password"
                className="rounded-full" />

              <div className="flex flex-row justify-between">
                <Button size="sm" variant="ghost" className="rounded-full">
                  <Label>Create Account</Label>
                </Button>

                <Button size="sm" variant="ghost" className="rounded-full">
                  <Label className="text-sm font-bold">Forgort Password ?</Label>
                </Button>
              </div>
              <Button variant="outline" className="rounded-full">Login</Button>
            </CardContent>
          </Card>
        </div>
      )}
    </section>
  );
}