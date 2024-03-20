import recommendMenu from './data/recommandData.json';

console.log("@@@@")
console.log(recommendMenu);

// recommandData.json 받아오는곳
export function getRecommendMenuList() {
    return recommendMenu;
}