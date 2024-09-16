import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import React from "react";
type HeaderProps = {
  breadcrumbItems: BreadcrumbItemType[];
  currentPage: string;
};
type BreadcrumbItemType = {
  title: string;
  to: string;
};
const Header = ({ breadcrumbItems = [], currentPage }: HeaderProps) => {
  return (
    <div className="bg-white shadow-md p-3 flex justify-between items-center">
      <Breadcrumb>
        <BreadcrumbList>
          {breadcrumbItems.map((item) => {
            return (
              <React.Fragment>
                <BreadcrumbItem>
                  <BreadcrumbLink href={item.to}>{item.title}</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
              </React.Fragment>
            );
          })}
          <BreadcrumbItem>
            <BreadcrumbPage>{currentPage}</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex justify-end items-center gap-2">
        <p className="font-semibold">Lê Văn Hoàng Vũ</p>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
