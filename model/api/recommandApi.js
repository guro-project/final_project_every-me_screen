import recommendMenu from './data/recommandData.json';

console.log("@@@@")
console.log(recommendMenu);
// json데이터 받아오는 곳
export function getRecommendMenuList() {
    return recommendMenu;
}

// // menuDetail에서 넘겨준 메뉴 코드 값과 일치하는 메뉴 객체를 반환
// export function getMenuDetail(menuCode) {

//     // 사용자가 요청한 메뉴 코드와 일치하는 메뉴를 반환함
//     return menus.filter(menu => menu.menuCode === parseInt(menuCode))[0];
// }

// export function searchMenu(menuCode) {
//     return menus.filter(menu => menu.menuName.match(menuCode));
// }

// export function getNum1(menuNum){

//     return recommendMenu.filter(menu => menu.menuNum === parseInt(menuNum)[0]);
// }