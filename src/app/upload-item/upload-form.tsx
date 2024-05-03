'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import { useContext, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoMdCheckmark } from 'react-icons/io';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/components/ui/use-toast';
import images from '@/img';
import {
  CreateProductBody,
  CreateProductBodyType,
  ProductResType,
} from '@/schemaValidations/product.schema';
import { useRouter } from 'next/navigation';
import { AppContext } from '@/context/app-context';
import { BiLoaderAlt, BiLoaderCircle } from 'react-icons/bi';

import { CgSpinner } from 'react-icons/cg';

type Product = ProductResType['data'];

const UploadForm = ({ product }: { product?: Product }) => {
  const { uploadToPinata, createNft } = useContext(AppContext);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isUploadIpfs, setIsUploadIpfs] = useState(false);
  const [active, setActive] = useState(0);
  const [category, setCategory] = useState(0);

  const form = useForm<CreateProductBodyType>({
    resolver: zodResolver(CreateProductBody),
    defaultValues: {
      name: product?.name ?? '',
      price: product?.price ?? 0,
      description: product?.description ?? '',
      image: product?.image ?? '',
    },
  });

  const image = form.watch('image');

  const categoryArry = [
    {
      image: images.nft_image_1,
      category: 'Sports',
    },
    {
      image: images.nft_image_2,
      category: 'Arts',
    },
    {
      image: images.nft_image_3,
      category: 'Music',
    },
    {
      image: images.nft_image_1,
      category: 'Digital',
    },
    {
      image: images.nft_image_2,
      category: 'Time',
    },
    {
      image: images.nft_image_3,
      category: 'Photography',
    },
  ];

  const onSubmit = async (values: CreateProductBodyType) => {
    console.log('sdfsadfasdfsd');

    setIsLoading(true);
    createNft(
      values.name,
      values.price,
      values.image || '',
      values.description
    );
    setIsLoading(false);
  };

  console.log(isLoading);

  return (
    <div className="mt-10 md:mt-0 space-y-5 sm:space-y-6 md:sm:space-y-8">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit, (error) => {
            console.log(error);
            console.log(form.getValues('image'));
          })}
          className="space-y-2  flex-shrink-0 w-full"
          noValidate
        >
          <FormField
            control={form.control}
            name="image"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-lg sm:text-2xl font-semibold">
                  Image, Video, Audio, or 3D Model
                </FormLabel>
                <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                  File types supported: JPG, PNG, GIF, SVG, MP4, WEBM, MP3, WAV,
                  OGG, GLB, GLTF. Max size: 100 MB
                </p>
                <FormControl>
                  <Input
                    type="file"
                    accept="image/*"
                    ref={inputRef}
                    onChange={async (e) => {
                      setIsUploadIpfs(true);
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = await uploadToPinata(file);
                        field.onChange(url);
                      }
                      setIsUploadIpfs(false);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="mt-4">
            {isUploadIpfs && <span className="animate-spin">Loading...</span>}
          </div>
          {image && (
            <div>
              <Image
                src={image}
                width={128}
                height={128}
                alt="preview"
                className="w-32 h-32 object-cover rounded-lg mb-4"
              />
            </div>
          )}

          <div className="mt-8">
            <div className="mt-8 w-full flex gap-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      className="font-semibold
                    text-base"
                    >
                      NFT Name
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="Nft Name" type="text" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormLabel
                      className="font-semibold
                    text-base"
                    >
                      Price
                    </FormLabel>
                    <FormControl>
                      <Input placeholder="giá" type="number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="mt-8 w-full">
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel
                      className="font-semibold
                    text-base"
                    >
                      Description
                    </FormLabel>
                    <FormControl>
                      <Textarea placeholder="..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <hr className=" border-gray-200 sm:mx-auto dark:border-gray-700 my-8"></hr>
            <div className="mt-2 w-full">
              <label
                htmlFor="name"
                className="text-base font-medium text-neutral-900 dark:text-neutral-200"
              >
                Choose collection
              </label>
              <p className="text-neutral-500 dark:text-neutral-400 text-sm">
                Choose an exiting collection or create a new one
              </p>

              <div className="flex gap-2  overflow-auto py-2 space-x-4">
                {categoryArry.map((el, i) => (
                  <div
                    className={`"bg-teal-600 text-white
                relative flex-shrink-0 w-44 rounded-xl border border-neutral-200 dark:border-neutral-700 px-6 py-5 cursor-pointer flex focus:outline-none" ${
                  active == i + 1 ? 'bg-teal-600' : ''
                }`}
                    key={i + 1}
                    //@ts-ignore
                    onClick={() => (setActive(i + 1), setCategory(el.category))}
                  >
                    <div>
                      <div className="flex justify-between items-center">
                        <div className=" aspect-square">
                          <Image
                            src={el.image}
                            alt="background image"
                            width={50}
                            height={50}
                            className={
                              'object-cover w-full h-full rounded-full'
                            }
                          />
                        </div>
                        {active == i + 1 ? (
                          <div className="p-1 rounded-full bg-slate-400">
                            <IoMdCheckmark />
                          </div>
                        ) : (
                          <></>
                        )}
                      </div>
                      <p className="font-semibold mt-3  text-white">
                        Crypto Legend - {el.category}{' '}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 space-x-0 sm:space-x-3 ">
              <Button type="submit" className="rounded-full w-full">
                {isLoading && (
                  <span className="animate-spin mr-4">
                    <CgSpinner />
                  </span>
                )}
                {isLoading ? 'Loading...' : 'Upload'}
              </Button>
            </div>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default UploadForm;
