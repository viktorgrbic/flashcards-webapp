"use client"
import {useEffect,useState} from "react";

import Image from "next/image";
import {mockDecks,mockSubjects} from "@/mock/data";
import { FullDeckDto, FullSubjectDto } from "@/shared/types";
type Props ={subjects:FullSubjectDto[] };
import Link from "next/link";
export default function DeckBrowser({ subjects }: Props) {
    const [decks,setDecks]=useState<FullDeckDto[]>(mockDecks);
    const [search,setSearch]=useState("");


    useEffect(()=>{
        console.log(search)
        let data=mockDecks;

        if(search.trim()){
            data=data.filter(d=>d.name.toLocaleLowerCase().includes(search.toLocaleLowerCase()))
        }
        setDecks(data)
    },[search]);
    return (
        <div className="mx-auto max-w-7xl px-4 py-8">
            <div className="flex flex-col gap-8 md:flex-row">
                {/* <p>Komponenta DeckBrowser je ovde</p> */}
                <aside className="w-full md:w-64 shrink-0">
    <div className="flex flex-col gap-4 md:sticky md:top-20">
        {/* Search */}
        <input
            placeholder="Pretraga špilova…"
            className="w-full rounded border border-gray-200 px-3 py-2"

            value={search}
            onChange={(e)=>setSearch(e.target.value)}
        />
    </div>
</aside>

{/* Cards */}
                {/* Cards */}
                <section className="flex-1">
                    {decks.length === 0 ?(
                        <p className="text-center text-gray-500">
                            Nema spilova za dati filter.
                        </p>
                    ):(
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                       {decks.map((deck,idx)=>(

                     
                        <div
                            key={deck.id}
                            className="group relative overflow-hidden rounded-lg border border-gray-200"
                        >
                            <Image
                                src="https://picsum.photos/300/400"
                                alt=""
                                width={400}
                                height={300}
                                className="h-40 w-full object-cover transition-transform duration-200 group-hover:scale-105"
                            />

                            <div className="p-4">
                                <h3 className="font-semibold">{deck.name}
                               </h3>
                                <p className="text-sm text-gray-500">
                                   {subjects.find((s)=>s.id === deck.subject.id)?.name}
                                </p>
                            </div>
                            <Link
                            href={`/decks/${deck.id}`}
                            className="absolute inset-0"/>
                        </div>
                          ))}
                    </div>
                    )}
                </section>
            </div>
        </div>
    );

}
