"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChangeEvent, useState } from "react";

type PaperResponse = {
  title: string;
  summary: string;
  link: string;
};

export default function Page() {
  const [topic, setTopic] = useState<string>("");
  const [numPaper, setNumPaper] = useState<number>();

  const [loading, setLoading] = useState<boolean>(false);

  const [results, setResults] = useState<PaperResponse[]>();

  const handleSearchPaper = async (e: any) => {
    e.preventDefault();
    console.log(topic);
    console.log(numPaper);
  };
  return (
    <div className="p-10 mt-5">
      <div>
        <div className="text-center">
          <h1 className="mb-2 text-lg text-primary font-semibold">
            Arxiv Search
          </h1>
          <p className="text-muted-foreground">
            Search the papers based on the query
          </p>
          <div className="max-w-100 mx-auto mt-10">
            <Label htmlFor="topic">Topic</Label>
            <Input
              className="mt-4"
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic"
            />

            <Label htmlFor="topic" className="mt-5">
              Papers Limit
            </Label>

            <Select onValueChange={(value) => setNumPaper(Number(value))}>
              <SelectTrigger className="w-45 mt-4">
                <SelectValue placeholder="Select number" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="1">1</SelectItem>
                  <SelectItem value="2">2</SelectItem>
                  <SelectItem value="3">3</SelectItem>
                  <SelectItem value="4">4</SelectItem>
                  <SelectItem value="5">5</SelectItem>
                  <SelectItem value="6">6</SelectItem>
                  <SelectItem value="7">7</SelectItem>
                  <SelectItem value="8">8</SelectItem>
                  <SelectItem value="9">9</SelectItem>
                  <SelectItem value="10">10</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>

            <Button
              type="submit"
              onClick={handleSearchPaper}
              className="mt-7 w-full"
            >
              Search
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
