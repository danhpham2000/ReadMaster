"use client";

import { Button } from "@/components/ui/button";
import { Card, CardDescription, CardTitle } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { ExternalLink, LucideLoader2 } from "lucide-react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

type PaperResponse = {
  title: string;
  summary: string;
  link: string;
};

export default function Page() {
  const [topic, setTopic] = useState<string>("");
  const [numPapers, setNumPapers] = useState<number>();

  const [loading, setLoading] = useState<boolean>(false);

  const [results, setResults] = useState<PaperResponse[]>();

  const [error, setError] = useState<string>("");

  const handleSearchPaper = async (e: any) => {
    e.preventDefault();
    setTopic("");
    setNumPapers(0);

    setLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_ENDPOINT}/api/query-paper`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ topic: topic, num_papers: numPapers }),
        }
      );

      setLoading(false);

      const data = await response.json();
      setResults(data.results);
    } catch (e) {
      setError(e as string);
      return e;
    }
  };
  return (
    <div className="p-10 mt-5">
      <div className="text-center">
        <div>
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

            <Select onValueChange={(value) => setNumPapers(Number(value))}>
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

        {loading && (
          <div>
            <span>Searching</span>
            <LucideLoader2 className="animate-spin text-primary" />
          </div>
        )}

        {error && (
          <div>
            <span>{error}</span>
          </div>
        )}

        <div className="mt-5">
          <h1 className="font-medium text-lg text-primary">Result</h1>
          {results && (
            <div>
              <div>
                <p className="text-muted-foreground mt-2">
                  Found {results.length} papers
                </p>
              </div>
              <div className="space-y-5 grid grid-cols-1 mt-5">
                {results?.map((doc) => (
                  <Card className="max-w-100 mx-auto p-3" key={doc.title}>
                    <CardTitle className="text-md">{doc.title}</CardTitle>
                    <CardDescription>
                      <Link
                        href={doc.link}
                        className="flex items-center gap-3 justify-center"
                      >
                        Link <ExternalLink />
                      </Link>
                    </CardDescription>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="w-50 mx-auto">View Summary</Button>
                      </DialogTrigger>
                      <DialogContent>
                        <DialogTitle>Summary</DialogTitle>
                        <DialogDescription>{doc.summary}</DialogDescription>
                      </DialogContent>
                    </Dialog>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
