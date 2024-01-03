"use client";

import SearchForm from "@/components/SearchForm";
import { Product } from "@/types/types";
import { useEffect, useState } from "react";
import Image from "next/image";
import { getAllProducts } from "@/lib/actions";
import { get } from "http";

const Page = () => {
  const [product, setProduct] = useState<Product | null | undefined>(null);

  // useEffect(() => {
  //   const fetchAll = async () => {
  //     const data = await getAllProducts();
  //     console.log(data);
  //   };
  //   fetchAll();
  // }, []);

  return (
    <main className="flex flex-center flex-col w-full">
      <section className="w-full">
        <div className="flex flex-center relative min-h-[174px] w-full flex-col text-center">
          <h1 className="sm:text-3xl text-2xl mb-6 text-center">
            Smart shopping
          </h1>
        </div>
        <SearchForm setProduct={setProduct} />
        {product && (
          <>
            <div className="flex flex-col">
              <h2 className="text-2xl font-bold">{product.title}</h2>
              <p className="text-lg">{product.price}</p>
            </div>
            <Image
              src={product.imageUrl}
              alt={product.title}
              width={500}
              height={500}
            />
          </>
        )}
      </section>
    </main>
  );
};

export default Page;
