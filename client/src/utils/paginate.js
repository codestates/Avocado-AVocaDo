// Load the full build.
// TODO: DOC => https://lodash.com/docs/4.17.15

// array 대신 사용하는 이유: 성능이 좋다.
// 데이터가 많을 경우 array 에 비해 성능이 좋을 것으로 예측된다.
import _ from 'lodash';

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize; // 자를 배열의 시작점

  // startIndex slice 때문에 만든 변수
  // TODO: slice ?
  /*   _.slice(array, [start=0], [end=array.length])

    Creates a slice of array from start up to, but not including, end.
    This method is used instead of Array#slice to ensure dense arrays are returned.
    array (Array): The array to slice.
    [start=0] (number): The start position.
    [end=array.length] (number): The end position. 
    Returns the slice of array.
    */

  // TODO: take?

  /* 
  Creates a slice of array with n elements taken from the beginning.
  _.take(array, [n=1])
  array (Array): The array to query.
  [n=1] (number): The number of elements to take.
  Returns the slice of array.
  */
  // 전체배열을 복사(slice)
  // 복사한 배열을 특정 index까지 만 자름 (take)
  //

  // _.slice(items,startIndex,pageSize)
  // 전체 worddata, 현재page, 전체 page size
  // 처음에는 0~5 까지 복사해서 주고
  // 그다음에는 6~10 복사해서 주고

  // pagenation 할 때마다 시작점이랑 끝점을 특정 숫자만큼 증가시켜서 slice 에 전달인자로 넣고
  // 배열을 리턴한다.
  console.log(items, startIndex, pageSize);
  console.log('변경', _.slice(items, startIndex, startIndex + pageSize));
  return _(items).slice(startIndex).take(pageSize).value();
}
