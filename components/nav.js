import * as React from "react";
import { InlineText, InlineGroup } from "react-tinacms-inline";
import Link from 'next/link'

export const Nav = ({ data }) => {

  return (
        <div className="relative flex flex-col flex-wrap py-8 px-8 lg:px-12 2xl:px-16 mx-auto md:items-center md:flex-row">
               <style jsx>{`
 a {
  margin: 20px;
  color: inherit;
  text-decoration: none;
}

 nav{
   position: ${data.fixed ? 'fixed' : 'static'};
   background-color: ${data.backgroundColor ? data.backgroundColor : 'none'};
   color: ${data.textColor ? data.textColor : 'none'};
   ${data.top ? 'top: calc('+data.top+');' : ''}
   ${data.left ? 'left: calc('+data.left+');' : ''}
  //  ${data.top && data.top.includes('%') || data.left  && data.left.includes('%')  ? `transform: translate(-${data.left}, -${data.top});`:''}
  border-radius: 999px;
  z-index: 1;
 }

        `}</style>
          <div className="flex-grow md:flex md:justify-end">
            <nav className="flex flex-wrap items-center justify-between sm:justify-end text-base -mx-2 sm:-mx-6 md:mx-0">
              <Link href="/"><a>home</a></Link>
              {data.nav.items.map(function (item, index) {
                return (
                  <Link
                    key={index}
                    href={item.link}
                  >
                    <a>{item.label}</a>
                  </Link>
                );
              })}
            </nav>
          </div>
        </div>
  );
};
