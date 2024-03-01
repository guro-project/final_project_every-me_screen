import recommendMenu from './data/recommandData.json';

console.log("@@@@")
console.log(recommendMenu);
// json데이터 받아오는 곳
export function getRecommendMenuList() {
    return recommendMenu;
}