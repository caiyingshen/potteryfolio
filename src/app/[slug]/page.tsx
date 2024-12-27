"use client";
import { PortableText, type SanityDocument } from "next-sanity";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import { client } from "@/sanity/client";
import Link from "next/link";
import { portfolioEntryQuery, updatesQuery } from "@/static/queries";
import "../../css/postPage.css";
import "../../css/base.css";
import { useEffect, useState } from "react";

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const options = { next: { revalidate: 30 } };

export default function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const [post, setPost] = useState<SanityDocument>();
  const [pieceUpdates, setPieceUpdates] = useState<SanityDocument>();
  const [postImageUrl, setPostImageUrl] = useState<string>();

  async function getPost() {
    const post = await client.fetch<SanityDocument>(
      portfolioEntryQuery,
      await params,
      options
    );
    setPost(post);
    if (post.image) {
      setPostImageUrl(urlFor(post.image)?.url());
    }
  }

  async function getPieceUpdates() {
    const pieceIdRefs = post?.pieceIds.map((p: { _ref: string }) => p._ref);
    const pieceUpdates = await client.fetch<SanityDocument>(
      updatesQuery,
      { pieceIdArray: pieceIdRefs },
      options
    );

    setPieceUpdates(pieceUpdates);
  }

  useEffect(() => {
    getPost();
  }, []);

  useEffect(() => {
    if (post) {
      getPieceUpdates();
    }
  }, [post]);

  return (
    <>
      {post && pieceUpdates ? (
        <div className="post-container">
          <div className="main-post">
            <Link href="/" className="hover:underline back-arrow">
              ← Back to posts
            </Link>
            {postImageUrl && (
              <img className="post-image" src={postImageUrl} alt={post.title} />
            )}
          </div>

          <div className="notes-section">
            <h1 className="text-3xl font-bold mb-8">{post.title}</h1>
            <div className="prose">
              <p className="p1">
                Published: {new Date(post.publishedAt).toLocaleDateString()}
              </p>
              {Array.isArray(post.body) && <PortableText value={post.body} />}
            </div>
          </div>

          <div className="updates">
            {pieceUpdates.length > 0 && (
              <h3 className="text-2xl font-bold mb-8">Progress Updates</h3>
            )}
            {pieceUpdates.map(
              (
                up: {
                  image: SanityImageSource;
                  notes: string;
                  updatedAt: string;
                },
                i: number
              ) => {
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
              }
            )}
          </div>
        </div>
      ) : (
        <img
          className="loading-spinner"
          src="https://i.gifer.com/ZKZg.gif"
          height="25px"
          width="25px"
        />
      )}
    </>
  );
}
