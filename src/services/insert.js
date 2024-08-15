const { v4 } = require("uuid");
const chothuecanho = require("../data/chothuecanho.json");
const chothuematbang = require("../data/chothuematbang.json");
const chothuephongtro = require("../data/chothuephongtro.json");
const nhachothue = require("../data/nhachothue.json");
const generateCode = require("../utils/generateCode");
const { getNumberFromString } = require("../utils/common");

const { dataArea, dataPrice } = require("../utils/data");
const db = require("../models");
const { hashPassword } = require("./auth");

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
const insert = () =>
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

      await db.Category.create({
        code: "CTCH",
        value: "Cho thuê căn hộ",
        header: "Cho Thuê Căn Hộ Chung Cư, Giá Rẻ, View Đẹp, Mới Nhất 2024",
        subheader:
          "Cho thuê căn hộ - Kênh đăng tin cho thuê căn hộ số 1: giá rẻ, chính chủ, đầy đủ tiện nghi. Cho thuê chung cư với nhiều mức giá, diện tích cho thuê khác nhau.",
        createdAt: new Date(), // Use the current timestamp
        updatedAt: new Date(),
      });

      await db.Category.create({
        code: "CTMB",
        value: "Cho thuê mặt bằng",
        header: "Cho Thuê Căn Hộ Chung Cư, Giá Rẻ, View Đẹp, Mới Nhất 2024",
        subheader:
          "Cho thuê căn hộ - Kênh đăng tin cho thuê căn hộ số 1: giá rẻ, chính chủ, đầy đủ tiện nghi. Cho thuê chung cư với nhiều mức giá, diện tích cho thuê khác nhau.",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await db.Category.create({
        code: "CTPT",
        value: "Cho thuê phòng trọ",
        header: "Cho Thuê Phòng Trọ, Giá Rẻ, Tiện Nghi, Mới Nhất 2024",
        subheader:
          "Cho thuê phòng trọ - Kênh thông tin số 1 về phòng trọ giá rẻ, phòng trọ sinh viên, phòng trọ cao cấp mới nhất năm 2024. Tất cả nhà trọ cho thuê giá tốt nhất tại Việt Nam.",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      await db.Category.create({
        code: "NCT",
        value: "Nhà cho thuê",
        header: "Cho Thuê Nhà Nguyên Căn, Giá Rẻ, Chính Chủ, Mới Nhất 2024",
        subheader:
          "Cho thuê nhà nguyên căn, nhà riêng: giá rẻ, chính chủ, đầy đủ tiện nghi. Tìm thuê nhà với nhiều mức giá khác nhau, đa dạng loại diện tích. Đăng tin cho thuê nhà nhanh, hiệu quả tại phongtro123.com",
        createdAt: new Date(),
        updatedAt: new Date(),
      });

      resolve();
    } catch (error) {
      reject(error);
    }
  });

module.exports = { insert };
