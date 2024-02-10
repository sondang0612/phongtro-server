import { v4 } from "uuid";
import chothuecanho from "../data/chothuecanho.json";
import chothuematbang from "../data/chothuematbang.json";
import chothuephongtro from "../data/chothuephongtro.json";
import nhachothue from "../data/nhachothue.json";
import generateCode from "../utils/generateCode";
import { getNumberFromString } from "../utils/common";

import { dataArea, dataPrice } from "../utils/data";
import db from "../models";
import { hashPassword } from "./auth";

const data = [
  {
    body: chothuecanho.body,
    categoryCode: "CTCH",
  },
  {
    body: chothuematbang.body,
    categoryCode: "CTMB",
  },
  {
    body: chothuephongtro.body,
    categoryCode: "CTPT",
  },
  {
    body: nhachothue.body,
    categoryCode: "NCT",
  },
];

const provinceCodes = [];
const insertDataBody = async (data, categoryCode) => {
  data.forEach(async (item) => {
    const postId = v4();
    const labelCode = generateCode(item?.header?.class?.classType);
    const attributesId = v4();
    const userId = v4();
    const imagesId = v4();
    const overviewId = v4();
    const currentArea = getNumberFromString(item?.header?.attributes?.acreage);
    const currentPrice = getNumberFromString(item?.header?.attributes?.price);
    const provinceCode = generateCode(
      item?.header?.address?.split(",")?.slice(-1)[0]
    ).trim();
    provinceCodes?.filter((item) => item?.code === provinceCode).length === 0 &&
      provinceCodes.push({
        code: provinceCode,
        value: item?.header?.address?.split(",")?.slice(-1)[0],
      });
    await db.Label.findOrCreate({
      where: { code: labelCode },
      defaults: {
        code: labelCode,
        value: item?.header?.class?.classType,
      },
    });
    await db.Post.create({
      id: postId,
      title: item?.header?.title,
      star: item?.header?.star,
      labelCode,
      address: item?.header?.address,
      attributesId,
      categoryCode,
      description: JSON.stringify(item?.mainContent?.content),
      userId,
      overviewId,
      imagesId,
      areaCode: dataArea.find(
        (area) => area.max > currentArea && area.min <= currentArea
      )?.code,
      priceCode: dataPrice.find(
        (price) => price.max > currentPrice && price.min <= currentPrice
      )?.code,
      provinceCode,
    });

    await db.Attribute.create({
      id: attributesId,
      price: item?.header?.attributes?.price,
      acreage: item?.header?.attributes?.acreage,
      published: item?.header?.attributes?.published,
      hashtag: item?.header?.attributes?.hashtag,
    });

    await db.Image.create({
      id: imagesId,
      image: JSON.stringify(item?.images),
    });

    await db.Overview.create({
      id: overviewId,
      code: item?.overview?.content?.find((i) => i.name === "Mã tin:")?.content,
      area: item?.overview?.content?.find((i) => i.name === "Khu vực:")
        ?.content,
      type: item?.overview?.content?.find((i) => i.name === "Loại tin rao:")
        ?.content,
      target: item?.overview?.content?.find((i) => i.name === "Đối tượng thuê:")
        ?.content,
      bonus: item?.overview?.content?.find((i) => i.name === "Gói tin:")
        ?.content,
      created: item?.overview?.content?.find((i) => i.name === "Ngày đăng:")
        ?.content,
      expired: item?.overview?.content?.find((i) => i.name === "Ngày hết hạn:")
        ?.content,
    });
    await db.User.create({
      id: userId,
      name: item?.contact?.content?.find((i) => i.name === "Liên hệ:")?.content,
      password: hashPassword("123456"),
      phone: item?.contact?.content?.find((i) => i.name === "Điện thoại:")
        ?.content,
      zalo: item?.contact?.content?.find((i) => i.name === "Zalo")?.content,
    });
  });
};
export const insert = () =>
  new Promise(async (resolve, reject) => {
    try {
      dataPrice.forEach(async (item, index) => {
        await db.Price.create({
          code: item.code,
          value: item.value,
          order: index + 1,
        });
      });

      dataArea.forEach(async (item, index) => {
        await db.Area.create({
          code: item.code,
          value: item.value,
          order: index + 1,
        });
      });
      data.forEach(async (item) => {
        insertDataBody(item.body, item.categoryCode);
      });

      provinceCodes.map(async (province) => {
        await db.Province.create({
          ...province,
        });
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });
