import React from 'react';

import Filter from './../components/Filter'

export default function Home({}) {
  // const getBlocks = function () {
  //   const { filter, blocks, blocks30 } = this.state;
  //   switch (filter) {
  //     case 0:
  //     case 365:
  //       let data = blocks;
  //       if (filter) {
  //         const now = new Date();
  //         const filterTime = (new Date()).setDate(now.getDate() - filter);
  //         data = blocks.filter(x => new Date(x.d) >= filterTime)
  //       }
  //       return data;
  //     default:
  //       return blocks30;
  //   }
  // }

  return (
    <React.Fragment>
      <Filter />
    </React.Fragment>
  );
}