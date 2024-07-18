"use client";
import { useGetProjectsQuery } from "@/redux/features/project/project.api";
import { IProjects } from "@/types/project";
import { formatDistanceToNow } from "date-fns";
import { CalendarDaysIcon } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardTitle } from "../ui/card";
const RecentProject = () => {
  const { data } = useGetProjectsQuery(undefined);

  return (
    <div className="flex flex-col justify-start items-start gap-[10px] mt-[20px] w-full mb-[20px]">
      <h2 className="text-primaryTxt font-[700] text-[35px]">
        Recent Projects
      </h2>
      <div className="gridResponsive gap-[20px] flex-wrap w-full">
        {data?.data.map((project) => (
          <ProjectCard data={project} key={project._id} />
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ data }: { data: IProjects }) => {
  //   const createdAt = new Date(data.createdAt || "22-12-2024");
  const updatedAt = new Date(data.updatedAt || "22-12-2024");

  return (
    <Link href={`/canvas/${data._id}`} className="w-full">
      <Card>
        <CardContent className="px-[10px] pt-[10px]">
          <div className="w-full bg-slate-100 h-[150px]"></div>

          <CardTitle className="text-[16px] mt-[20px]">
            {data.projectName || "Untitle project"}
          </CardTitle>
          <div className="flex flex-col gap-[3px] mt-[10px]">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <CalendarDaysIcon className="w-4 h-4" />
              <span>
                <span className="font-[600]">Created</span>{" "}
                {formatDistanceToNow(updatedAt, { addSuffix: false })} ago
              </span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <CalendarDaysIcon className="w-4 h-4" />
              <span>
                <span className="font-[600]">Updated</span>{" "}
                {formatDistanceToNow(updatedAt, { addSuffix: false })} ago
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default RecentProject;
