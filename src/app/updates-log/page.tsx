"use client"
import "@/css/base.css";
import Link from "next/link";
import { client } from "@/sanity/client";
import { useEffect, useState } from "react";
import { type SanityDocument } from "next-sanity";
import { allUpdatesQuery } from "@/static/queries";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";
import imageUrlBuilder from "@sanity/image-url";
import "@/css/updates.css"

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

export default function UpdatesPage() {
  const [updates, setUpdates] = useState<SanityDocument[]>();

  async function getUpdates() {
    const updates = await client.fetch<SanityDocument[]>(
      allUpdatesQuery,
      {},
      { next: { revalidate: 30 } }
    );
    setUpdates(updates);
  }

  useEffect(() => {
    getUpdates();
  }, []);
  return (
    <>
      <main className="update-list-container">
      <Link href="/" className="hover:underline back-arrow">
        ← Back to posts
      </Link>
        <h3 className="updates-heading">updates log</h3>
        {updates?.map((up, i) => {
          const postImageUrl = up.image
            ? urlFor(up.image)?.width(200).height(200).url()
            : null;

          return (
            <div className="update-container" key={`index-${i}`}>
              {postImageUrl && (
                <img
                  className="update-image"
                  src={postImageUrl}
                  alt={up.notes}
                />
              )}

              <div className="update-notes">
                <p className="p1">
                  {new Date(up.updatedAt).toLocaleDateString()}
                </p>
                <p> {up.notes}</p>
              </div>
            </div>
          );
        })}
      </main>
    </>
  );
}
