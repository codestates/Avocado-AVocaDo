import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize; // 자를 배열의 시작점

  return _(items).slice(startIndex).take(pageSize).value();
}
