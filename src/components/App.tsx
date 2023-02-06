import { useEffect, useState } from "react";

import * as lodash from "lodash";

import { ulid } from "ulid";

import {
  Box,
  Button,
  Center,
  Container,
  Heading,
  List,
  Text,
} from "@chakra-ui/react";

import { Menu } from "../model/Menu";

import { db } from "../libs/Firebase";
import { collection, getDocs } from "firebase/firestore";
import { MenuItem } from "./MenuItem";

function App() {
  const [menuList, setMenuList] = useState<Menu[]>([]);

  useEffect(() => {
    const usersCollectionRef = collection(db, "menus") as any;
    getDocs(usersCollectionRef).then((querySnapshot) => {
      setMenuList(querySnapshot.docs.map((doc: any) => doc.data()));
    });
  }, []);

  const [singleMenuGachaList, setSingleMenuGachaList] = useState<Menu[]>([]);
  const [mealMenuGachaList, setMealMenuGachaList] = useState<Menu[][]>([]);

  const [totalPrice, setTotalPrice] = useState<number>();

  const handleTurnGacha = () => {
    const BUDGET_LIMIT: number = 1000;

    let total: number = 0;

    let singleMenuGachaList: Menu[] = [];
    const mealMenuGachaList: Menu[] = [];

    while (total < BUDGET_LIMIT) {
      // 残金
      const remaining = BUDGET_LIMIT - total;

      // メニューリストから、残りの金額で買えるものだけに絞る
      const purchasableMenus = [...menuList].filter(
        (menu: Menu) => menu.price <= remaining
      );

      // 残りの金額で買えるものがない
      if (!purchasableMenus.length) {
        // 単品メニューが無い場合、割引は出来ないので終了する
        if (!singleMenuGachaList.length) break;

        // 単品のフードメニューが無い場合、単品のドリンクがあるということになる。
        // 単品のドリンクが限界までリストにあるはずなので、その状態ではフードメニューを割引しても残りの金額では買えない。
        // よって、ここでは購入不可で終了する。
        if (
          ![...singleMenuGachaList].filter(
            (menu: Menu) => menu.drinkDiscount > 0
          ).length
        )
          break;

        // 単品のフードメニューから、最大の割引額を取得する（割引が無ければ終了）
        const maxDiscountFood: Menu = [...singleMenuGachaList].sort(
          (a, b) => b.drinkDiscount - a.drinkDiscount
        )[0];
        if (maxDiscountFood.drinkDiscount <= 0) break;

        // 最大の割引額を適用して、残りの金額で買えるドリンクだけに絞る
        const purchasableMenusWithDiscount = [...menuList].filter(
          (menu: Menu) =>
            menu.price - maxDiscountFood.drinkDiscount <= remaining &&
            (menu.category === "hotdrink" || menu.category === "icedrink")
        );

        // 購入できるものからランダムにドリンクを選んで追加する。
        const randomIndex = Math.floor(
          Math.random() * purchasableMenusWithDiscount.length
        );
        const purchasableDrink: Menu = lodash.cloneDeep(
          purchasableMenusWithDiscount[randomIndex]
        );
        purchasableDrink.uuid = ulid();

        // 割引して合計金額に加算
        total += purchasableDrink.price - maxDiscountFood.drinkDiscount;

        // セットメニューのリストに追加
        mealMenuGachaList.push(maxDiscountFood);
        mealMenuGachaList.push(purchasableDrink);

        // 単品メニューのリストから割引したフードを除外
        singleMenuGachaList = singleMenuGachaList.filter(
          (menu: Menu) => menu.uuid !== maxDiscountFood.uuid
        );
        break;
      }

      // 購入可能なものから、ランダムに１つ選ぶ
      const randomIndex = Math.floor(Math.random() * purchasableMenus.length);
      const gachaMenu = lodash.cloneDeep(purchasableMenus[randomIndex]);
      gachaMenu.uuid = ulid();

      // 選ばれたメニューの金額
      const price = gachaMenu.price;

      // ガチャで選ばれた単品メニューから、値引き可能なフードを取得
      const discountFoodMenu = [...singleMenuGachaList, gachaMenu].filter(
        (menu: Menu) => menu.drinkDiscount > 0
      )[0];

      // ガチャで選ばれた単品メニューから、ドリンクを取得
      const discountDrinkMenu = [...singleMenuGachaList, gachaMenu].filter(
        (menu: Menu) =>
          menu.category === "hotdrink" || menu.category === "icedrink"
      )[0];

      if (discountDrinkMenu && discountFoodMenu) {
        // 値引き可能なセットが揃っている場合、値引きを行う
        total -= discountFoodMenu.drinkDiscount;

        // セットメニューのリストに追加
        mealMenuGachaList.push(discountFoodMenu);
        mealMenuGachaList.push(discountDrinkMenu);

        // 単品メニューのリストから削除
        singleMenuGachaList = singleMenuGachaList.filter(
          (menu: Menu) =>
            menu.uuid !== discountFoodMenu.uuid &&
            menu.uuid !== discountDrinkMenu.uuid
        );
      } else {
        // セットが揃わなかったら、単品として追加
        singleMenuGachaList.push(gachaMenu);
      }

      // BUDGET_LIMIT を超える場合は終了（値引き後に判定する必要がある）
      if (total + price > BUDGET_LIMIT) break;

      // 合計金額に加算
      total += price;
    }

    setSingleMenuGachaList(singleMenuGachaList);
    setMealMenuGachaList(to2DArray(mealMenuGachaList));
    setTotalPrice(total);
  };

  return (
    <Container
      centerContent
      p={{ base: "4", md: "6" }}
      maxWidth="lg"
      bg="white"
    >
      <>
        <Heading size="xl" color="#3d2900" paddingBottom={6}>
          ドトール1000円ガチャ
        </Heading>

        <Button
          colorScheme="yellow"
          shadow="md"
          mb={2}
          onClick={handleTurnGacha}
        >
          ガチャを回す
        </Button>

        <List w="lg">
          {mealMenuGachaList.map((menus: Menu[], index: number) => (
            <Box
              key={index}
              bg="yellow.100"
              borderColor={"black"}
              paddingTop={4}
              paddingBottom={4}
              paddingLeft={4}
              paddingRight={4}
              marginTop={4}
              marginBottom={0}
              marginLeft={4}
              marginRight={4}
              borderRadius="md"
            >
              <Center>
                <Text fontSize="lg" color="black" fontWeight={"bold"}>
                  セット {menus[0].drinkDiscount}円引き！
                </Text>
              </Center>
              {menus.map((menu: Menu) => (
                <MenuItem key={menu.uuid} menu={menu} />
              ))}
            </Box>
          ))}
        </List>
        <>
          {singleMenuGachaList.length !== 0 && (
            <List w="lg">
              <Box
                // paddingTop={2}
                paddingBottom={4}
                paddingLeft={4}
                paddingRight={4}
                marginTop={4}
                marginBottom={0}
                marginLeft={4}
                marginRight={4}
              >
                {/* <Center>
                  <Text fontSize="lg" color="black" fontWeight={"bold"}>
                    単品
                  </Text>
                </Center> */}
                {singleMenuGachaList.map((menu: Menu) => (
                  <MenuItem key={menu.uuid} menu={menu} />
                ))}
              </Box>
            </List>
          )}
        </>
        {[...mealMenuGachaList, ...singleMenuGachaList].length > 0 && (
          <Box w="md" bg="#7a5200" p={1} mt={4} borderRadius="md">
            <Center>
              <Text color="white" fontWeight={"bold"}>
                合計：{totalPrice}円
              </Text>
            </Center>
          </Box>
        )}
      </>
    </Container>
  );
}

function to2DArray(arr: any[]) {
  return arr.reduce((acc, _, index) => {
    if (index % 2 === 0) {
      acc.push(arr.slice(index, index + 2));
    }
    return acc;
  }, []);
}

export default App;
