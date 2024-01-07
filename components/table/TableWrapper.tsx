"use client";

import { FileType } from "@/typings";
import React, { useState } from "react";
import { Button } from "../ui/button";
import { DataTable } from "./Table";
import { columns } from "./columns";
import { useUser } from "@clerk/nextjs";
import { collection, orderBy, query } from "firebase/firestore";
import { useCollection } from "react-firebase-hooks/firestore";
import { db } from "@/firebase";

const TableWrapper = ({ skeletonFiles }: { skeletonFiles: FileType[] }) => {
  const { user } = useUser();
  const [initialFiles, setInitialFiles] = useState<FileType[]>([]);
  const [sort, setSort] = useState<"asc" | "desc">("desc");

  const [docs, loading, error] = useCollection(
    user &&
      query(
        collection(db, "users", user.id, "files"),
        orderBy("timestamp", sort)
      )
      // https://youtu.be/FdEY-ZnEikg
      // Implementing sort functionality
  );

  return (
    <div>
      <Button
        onClick={() => {
          setSort(sort === "desc" ? "asc" : "desc");
        }}
      >
        Sort By {sort === "desc" ? "Newst" : "Oldest"}
      </Button>

      <DataTable columns={columns} data={skeletonFiles} />
    </div>
  );
};

export default TableWrapper;
