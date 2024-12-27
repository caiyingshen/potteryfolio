/**
 * Adapted heavily from https://www.embla-carousel.com/examples/
 */
"use client";
import { EmblaOptionsType } from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import React from "react";
import { NextButton, PrevButton, usePrevNextButtons } from "./arrows";

import { type SanityDocument } from "next-sanity";
import { useEffect, useState } from "react";

import { client } from "@/sanity/client";
import imageUrlBuilder from "@sanity/image-url";
import type { SanityImageSource } from "@sanity/image-url/lib/types/types";
import "../css/embla.css";
import Link from "next/link";
import { allPortfolioEntriesQuery } from "@/static/queries";

type PropType = {
  slides?: number[];
  options?: EmblaOptionsType;
};

const { projectId, dataset } = client.config();
const urlFor = (source: SanityImageSource) =>
  projectId && dataset
    ? imageUrlBuilder({ projectId, dataset }).image(source)
    : null;

const PostsCarousel: React.FC<PropType> = (props) => {
  const { options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel(options);
  const [posts, setPosts] = useState<SanityDocument[]>();

  async function getPortfolioEntries() {
    const posts = await client.fetch<SanityDocument[]>(
      allPortfolioEntriesQuery,
      {},
      { next: { revalidate: 30 } }
    );
    setPosts(posts);
  }

  useEffect(() => {
    getPortfolioEntries();
  }, []);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <section className="embla">
      <div className="embla__viewport" ref={emblaRef}>
        <div className="embla__container">
          {posts ? (
            posts.map((post, i) => {
              const postImageUrl = post.image
                ? urlFor(post.image)?.url()
                : null;

              return (
                <div className="embla__slide" key={`slide-${i}`}>
                  {postImageUrl && (
                    <Link href={`/${post.slug.current}`}>
                      <img
                        src={postImageUrl}
                        alt={post.name}
                        className="embla__slide__img"
                      />
                    </Link>
                  )}
                </div>
              );
            })
          ) : (
            <img src="https://giphy.com/embed/uIJBFZoOaifHf52MER" />
          )}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton onClick={onPrevButtonClick} disabled={prevBtnDisabled} />
          <NextButton onClick={onNextButtonClick} disabled={nextBtnDisabled} />
        </div>
      </div>
    </section>
  );
};

export default PostsCarousel;
