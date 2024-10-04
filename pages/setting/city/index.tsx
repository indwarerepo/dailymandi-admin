import { City } from "@/components/setting/city/city";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ChevronLeft, FileDown, FileUp, Plus, Search } from "lucide-react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { useRouter } from "next/router";

export default function CityIndex() {
  const router = useRouter();
  return (
    <>
      <div className="py-3">
        <div className="mb-8 flex justify-between max-[500px]:items-center">
          <div className="max-[500px]:w-full max-[500px]:mb-2">
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/dashboard" className="flex items-center"><ChevronLeft /> Home</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <h2 className="text-2xl tracking-tight mb-0 mt-0 font-poppins font-thin">
            City
            </h2>
          </div>
          <div className="flex justify-end gap-3 max-[500px]:w-full res-button">
            <Button
              className="rounded-lg button-col w-full"
              onClick={() => router.push("/setting/city/add-edit")}
            >
              <Plus className="mr-2 w-4 h-4" /> Add City
            </Button>
          </div>
        </div>

        <Card className="w-full p-4 border mb-3 shadow-md">
          <CardContent>
            <form className="w-full">
              <div className="flex w-full items-center gap-4 max-[500px]:block max-[500px]:grid max-[500px]:grid-cols-2">
                <div className="flex flex-col space-y-1.5 search-w relative">
                  <Label htmlFor="name">Machine Name</Label>
                  <Input
                    id="name"
                    placeholder="Name of your Functionality"
                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                  />
                  <div className="absolute top-6 right-0 flex items-center max-[500px]:hidden">
                    <Search className="mr-2 w-4 h-4" />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5 search-w relative">
                  <Label htmlFor="description">Machine Dept</Label>
                  <Input
                    id="description"
                    placeholder="Description of your Functionality"
                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                  />
                  <div className="absolute top-6 right-0 flex items-center max-[500px]:hidden">
                    <Search className="mr-2 w-4 h-4" />
                  </div>
                </div>
                <div className="flex flex-col space-y-1.5 search-w relative">
                  <Label htmlFor="description">Machine Specifications</Label>
                  <Input
                    id="description"
                    placeholder="Description of your Functionality"
                    className="border-borderColor focus:border-borderColor bg-card outline-none"
                  />
                  <div className="absolute top-6 right-0 flex items-center max-[500px]:hidden">
                    <Search className="mr-2 w-4 h-4" />
                  </div>
                </div>
                <div className="search-buttwid">
                  <Button className="rounded-lg mt-5 button-col w-full">
                    <Search className="mr-2 w-4 h-4" /> Search
                  </Button>
                </div>
              </div>
            </form>
          </CardContent>
        </Card>

        <City />
      </div>
    </>
  );
}
