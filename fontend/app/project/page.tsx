import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { FolderCogIcon, FolderEditIcon, GroupIcon, Link2Icon, LucideChevronsLeftRight, MailIcon, ServerCrashIcon, UploadCloudIcon } from "lucide-react";

export default function Project() {
    return (
        <section className="flex flex-row w-screen h-screen">
            <aside className="flex flex-col fixed justify-between w-44 bg-accent h-full">
                <div className="flex flex-col text-center">
                    <h1 className="text-lg font-black">Therus</h1>
                </div>

                <div className="flex flex-col px-2 gap-2 w-full items-center justify-center">
                    <Button size="sm" variant="outline" className="flex flex-row gap-2 justify-start rounded-full w-full">
                        <GroupIcon className="size-5" />
                        Authentication
                    </Button>

                    <Button size="sm" variant="outline" className="flex flex-row gap-2 justify-start rounded-full w-full">
                        <ServerCrashIcon className="size-5" />
                        Database
                    </Button>

                    <Button size="sm" variant="outline" className="flex flex-row gap-2 justify-start rounded-full w-full">
                        <FolderCogIcon className="size-5" />
                        Storage
                    </Button>

                    <Button size="sm" variant="outline" className="flex flex-row gap-2 justify-start rounded-full w-full">
                        <LucideChevronsLeftRight className="size-5" />
                        Remote Config
                    </Button>
                </div>

                <div className="flex flex-col">

                </div>
            </aside>

            <main className="flex flex-col ml-44 w-screen h-screen">
                <section className="flex flex-col w-full px-5 md:px-56 py-10">
                    <Card className="flex w-full">
                        <CardContent className="p-5 w-full">
                            <Table className="flex flex-col w-full gap-5">
                                <TableCaption className="flex flex-row w-full text-2xl font-black">Authentication</TableCaption>
                                <Input
                                    className="md:w-[450px] rounded-full"
                                    placeholder="search by email address, phone number, or user UID" />

                                <TableHeader className="w-full">
                                    <TableRow className="grid grid-cols-12 items-center justify-center w-full">
                                        <TableHead className="col-span-3">Identifier</TableHead>
                                        <div className="col-span-3 grid grid-cols-2">
                                            <TableHead className="w-20 text-start">Providers</TableHead>
                                            <TableHead className="text-start">Created</TableHead>
                                        </div>
                                        <TableHead className="col-span-2">Signed In</TableHead>
                                        <TableHead className="col-span-4">User UID</TableHead>
                                    </TableRow>
                                </TableHeader>

                                <TableBody className="w-full">
                                    <TableRow className="grid grid-cols-12 items-center justify-center w-full rounded-lg">
                                        <TableCell className="col-span-3">home@gmail.com</TableCell>
                                        <div className="col-span-3 grid grid-cols-2">
                                            <TableCell className="col-span-1"><MailIcon className="size-5" /></TableCell>
                                            <TableCell className="col-span-1 text-sm">Mar 22, 2024</TableCell>
                                        </div>
                                        <TableCell className="col-span-2 text-sm">Mar 22, 2024</TableCell>
                                        <TableCell className="col-span-4">udJT0qfSHqM44faQoHrHZeaP2Bu1</TableCell>
                                    </TableRow>
                                </TableBody>
                            </Table>

                        </CardContent>
                    </Card>
                </section>

                <section className="flex flex-col w-full px-5 md:px-56 py-10">
                    <Card className="flex flex-col w-full">
                        <CardHeader className="flex flex-row items-center text-center justify-center gap-3 bg-accent p-5 w-full">
                            <Link2Icon className="size-5" />
                            <h1 className="flex flex-row w-full text-sm font-bold">https://pherux-app-default-rtdb.firebaseio.com</h1>
                        </CardHeader>
                        <CardContent className="p-5 w-full">

                        </CardContent>
                    </Card>
                </section>

                <section className="flex flex-col w-full px-5 md:px-56 py-10">
                    <Card className="flex flex-col w-full">
                        <CardHeader className="flex flex-row items-center text-center justify-between bg-accent p-5 w-full">
                            <div className="flex flex-row gap-3 items-center justify-center">
                                <Link2Icon className="size-5" />
                                <h1 className="flex flex-row w-full text-sm font-bold">gs://pherux-app.appspot.com</h1>
                            </div>

                            <div className="flex flex-row gap-3  items-center justify-center">
                                <Button size="sm" variant="outline">
                                    <UploadCloudIcon className="size-5" />
                                    Upload File
                                </Button>

                                <Button size="icon" variant="outline" className="rounded-full">
                                    <FolderEditIcon className="size-5" />
                                </Button>
                            </div>
                        </CardHeader>
                        <CardContent className="p-5 w-full">
                            <ul>
                                <li>
                                    <a>movies</a>
                                    <ul>
                                        <li>
                                            <a>cover</a>
                                            <a>``hioememmemem``</a>
                                        </li>

                                        <li>
                                            <a>cover</a>
                                            <a>``hioememmemem``</a>
                                        </li>

                                        <li>
                                            <a>cover</a>
                                            <a>``hioememmemem``</a>
                                        </li>
                                    </ul>
                                </li>
                            </ul>
                        </CardContent>
                    </Card>
                </section>
            </main>
        </section>
    )
}