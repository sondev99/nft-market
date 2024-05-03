import React, { useState } from 'react';
import { TiArrowSortedDown, TiArrowSortedUp, TiTick } from 'react-icons/ti';

import Style from './AuthorTaps.module.css';
import { Button } from '@/components/ui/button';
import MaxWidthWrapper from '@/components/MaxWidthWrapper';
type AuthorTapsProps = {
  setListedNfts: (value: boolean) => void;
  setCreated: (value: boolean) => void;
  setLike: (value: boolean) => void;
  setFollower: (value: boolean) => void;
  setFollowing: (value: boolean) => void;
};

const AuthorTaps = ({
  setListedNfts,
  setCreated,
  setLike,
  setFollower,
  setFollowing,
}: AuthorTapsProps) => {
  const [activeBtn, setActiveBtn] = useState(1);

  const openTab = (e: any) => {
    const btnText = e.target.innerText;
    console.log(btnText);

    if (btnText == 'Listed Nfts') {
      setListedNfts(true);
      setCreated(false);
      setFollower(false);
      setFollowing(false);
      setLike(false);
      setActiveBtn(1);
    } else if (btnText == 'Created') {
      setListedNfts(false);
      setCreated(true);
      setFollower(false);
      setFollowing(false);
      setLike(false);
      setActiveBtn(2);
    } else if (btnText == 'Liked') {
      setListedNfts(false);
      setCreated(false);
      setFollower(false);
      setFollowing(false);
      setLike(true);
      setActiveBtn(3);
    } else if (btnText == 'Following') {
      setListedNfts(false);
      setCreated(false);
      setFollower(false);
      setFollowing(true);
      setLike(false);
      setActiveBtn(4);
    } else if (btnText == 'Followers') {
      setListedNfts(false);
      setCreated(false);
      setFollower(true);
      setFollowing(false);
      setLike(false);
      setActiveBtn(5);
    }
  };

  const nomal =
    'flex-shrink-0 block font-medium px-4 py-2 text-sm sm:px-6 sm:py-2.5 capitalize rounded-full focus:outline-none text-neutral-500 dark:text-neutral-400 dark:hover:text-neutral-100 hover:text-neutral-900 hover:bg-neutral-100/70 dark:hover:bg-neutral-800 ';
  const active =
    'bg-neutral-900 dark:bg-neutral-100 text-neutral-50 dark:text-neutral-900';
  return (
    <MaxWidthWrapper>
      <div className="flex gap-8 font-medium">
        <button
          // variant={`${activeBtn == 1 ? '' : 'ghost'} `}
          className={`${activeBtn == 1 ? active : ''} ${nomal}`}
          onClick={(e) => openTab(e)}
        >
          Listed Nfts
        </button>
        <button
          className={`${activeBtn == 2 ? active : ''} ${nomal}`}
          onClick={(e) => openTab(e)}
        >
          Created
        </button>
        <button
          className={`${activeBtn == 3 ? active : ''} ${nomal}`}
          onClick={(e) => openTab(e)}
        >
          Liked
        </button>
        <button
          className={`${activeBtn == 4 ? active : ''} ${nomal}`}
          onClick={(e) => openTab(e)}
        >
          Following
        </button>
        <button
          className={`${activeBtn == 5 ? active : ''} ${nomal}`}
          onClick={(e) => openTab(e)}
        >
          Followers
        </button>
      </div>

      {/* <div className={Style.AuthorTaps_box_right}>
          <div
            className={Style.AuthorTaps_box_right_para}
            onClick={() => openDropDownList()}
          >
            <p>{selectedMenu}</p>
            {openList ? <TiArrowSortedUp /> : <TiArrowSortedDown />}
          </div>

          {openList && (
            <div className={Style.AuthorTaps_box_right_list}>
              {listArray.map((el, i) => (
                <div
                  key={i + 1}
                  onClick={() => setSelectedMenu(el)}
                  className={Style.AuthorTaps_box_right_list_item}
                >
                  <p>{el}</p>
                  <span>{selectedMenu == el && <TiTick />}</span>
                </div>
              ))}
            </div>
          )}
        </div> */}
    </MaxWidthWrapper>
  );
};

export default AuthorTaps;
