"use client";
import React, { startTransition, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ICategory } from "@/lib/models/Category";
import { Input } from "./ui/input";

type DropdownType = {
  value: string;
  handleChange: () => void;
};
function Dropdown({ value, handleChange }: DropdownType) {
  const [category, setCategory] = useState<ICategory[]>([]);
  const [newCategory, setNewCategory] = useState("");
  const handleAdd = () => {};
  return (
    <Select>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="CategoryId" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="light">Light</SelectItem>
        <SelectItem value="dark">Dark</SelectItem>
        <SelectItem value="system">System</SelectItem>
        <AlertDialog>
          <AlertDialogTrigger className="p-medium-14 flex w-full pl-8 rounded-sm py-3 text-primary-500 focus:text-primary-500 hover:bg-primary-50">
            Open
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>New Category</AlertDialogTitle>
              <AlertDialogDescription>
                <Input
                  type="text"
                  placeholder="Category name"
                  className="input-field mt-3"
                  onChange={(e) => setNewCategory(e.target.value)}
                />
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => startTransition(handleAdd)}>
                Continue
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </SelectContent>
    </Select>
  );
}

export default Dropdown;
