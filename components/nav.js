import * as React from "react";
import { InlineText, InlineGroup } from "react-tinacms-inline";
import Link from 'next/link'

export const Nav = ({ data }) => {
  console.log(data.fixed);
  return (

        <div className="relative flex flex-col flex-wrap py-8 px-8 lg:px-12 2xl:px-16 mx-auto md:items-center md:flex-row">
               <style  jsx>{`
 nav{
   position: ${data.fixed ? 'fixed' : 'static'};
   ${data.top ? 'top: '+data.top+';' : ''}
   ${data.left ? 'top: '+data.left+';' : ''}
   ${data.top && data.top.contains('%') || data.left && data.left.contains('%')  ? `transform: translate(-${data.left}, -${data.top});`:''
 }
        `}</style>
          <div className="flex-grow md:flex md:justify-end">
{/* <Link href="/">home</Link> */}

            <nav className="flex flex-wrap items-center justify-between sm:justify-end text-base -mx-2 sm:-mx-6 md:mx-0">
              {data.nav.items.map(function (item, index) {
                return (
                  <Link
                    key={index}
                    href={item.link}
                    className={`mx-2 sm:mx-6 md:mx-8 text-sm tracking-wide font-semibold transition duration-150 ease-out text-gray-600 dark:text-gray-200`}
                  >
                    {item.label}
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
  );
};
