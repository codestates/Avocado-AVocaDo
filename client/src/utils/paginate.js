import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize; // 자를 배열의 시작점
<<<<<<< HEAD
=======

>>>>>>> 7f60deb94142da22f4d6718c500ecdbca7aa331d
  // slice 를 두번한다고 보면 됨
  return _(items).slice(startIndex).take(pageSize).value();
}
