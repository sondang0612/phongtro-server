import { v4 } from "uuid";
import db from "../models";
import generateCode from "../utils/generateCode";
import moment from "moment";
import { Op } from "sequelize";

export const getPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAll({
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone"],
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Failed to get posts",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostService = (id) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findOne({
        where: { id },
        raw: true,
        nest: true,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone"],
          },
          {
            model: db.Label,
            as: "label",
            attributes: ["code", "value"],
          },
          {
            model: db.Overview,
            as: "overview",
            attributes: [
              "code",
              "type",
              "bonus",
              "area",
              "target",
              "created",
              "expired",
            ],
          },
        ],
        attributes: [
          "id",
          "title",
          "star",
          "address",
          "description",
          "categoryCode",
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Failed to get posts",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostsLimitService = (page, query) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAndCountAll({
        where: query,
        raw: true,
        nest: true,
        offset: +page * +process.env.LIMIT || 0,
        limit: +process.env.LIMIT,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone"],
          },
          {
            model: db.Label,
            as: "label",
            attributes: ["code", "value"],
          },
          {
            model: db.Overview,
            as: "overview",
            attributes: [
              "code",
              "type",
              "bonus",
              "area",
              "target",
              "created",
              "expired",
            ],
          },
        ],
        attributes: [
          "id",
          "title",
          "star",
          "address",
          "description",
          "categoryCode",
        ],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Failed to get posts",
        totalPages: response
          ? Math.round(response.count / +process.env.LIMIT)
          : 0,
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getNewestPostsService = () =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAndCountAll({
        raw: true,
        nest: true,
        offset: 0,
        limit: 10,
        order: [["createdAt", "DESC"]],
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone"],
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Failed to get posts",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const createPostService = (body, userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const attributesId = v4();
      const imagesId = v4();
      const overviewId = v4();
      const labelCode = generateCode(body.label);
      const priceNumber = +body.priceNumber;
      const areaNumber = +body.areaNumber;
      const hashtag = `#${Math.floor(Math.random() * Math.pow(10, 6))}`;
      const postId = v4();
      const currentDate = new Date();
      const area = await db.Area.findOne({
        where: { value: body.area.value },
        raw: true,
        attributes: ["code"],
      });

      const price = await db.Price.findOne({
        where: { value: body.price.value },
        raw: true,
        attributes: ["code"],
      });

      await db.Post.create({
        id: postId,
        title: body.title || null,
        star: 0,
        labelCode,
        address: body.address || null,
        attributesId,
        categoryCode: body.categoryCode || null,
        description: JSON.stringify(body.description) || null,
        userId,
        overviewId,
        imagesId,
        areaCode: area.code,
        priceCode: price.code,
        provinceCode: "CHMN",
        priceNumber: priceNumber,
        areaNumber: areaNumber,
      });
      await db.Attribute.create({
        id: attributesId,
        price:
          priceNumber < 1
            ? `${priceNumber * 1000000} đồng/tháng`
            : `${priceNumber} triệu/tháng`,
        acreage: areaNumber,
        published: moment(new Date())
          .locale("vi")
          .format("DD/MM/YYYY hh:ss:mm"),
        hashtag,
      });
      await db.Image.create({
        id: imagesId,
        image: JSON.stringify(body.images),
      });

      await db.Overview.create({
        id: overviewId,
        code: hashtag,
        area: `${areaNumber} m2`,
        type: body?.categoryCode,
        target: body?.gender,
        bonus: "Tin thường",
        created: moment(currentDate).locale("vi").format("DD/MM/YYYY hh:ss:mm"),
        expired: moment(currentDate.setDate(currentDate.getDate() + 10))
          .locale("vi")
          .format("DD/MM/YYYY hh:ss:mm"),
      });

      await db.Province.findOrCreate({
        where: {
          [Op.or]: [
            { value: body?.province?.replace("Thành phố ", "").trim() },
            { value: body?.province?.replace("Tỉnh ", "").trim() },
          ],
        },
        defaults: {
          code: body?.province?.includes("Thành phố ")
            ? generateCode(body?.province?.replace("Thành phố ", ""))
            : generateCode(body?.province?.replace("Tỉnh ", "")),
          value: body?.province?.includes("Thành phố ")
            ? body?.province?.replace("Thành phố ", "")
            : body?.province?.replace("Tỉnh ", ""),
        },
      });

      await db.Label.findOrCreate({
        where: {
          code: labelCode,
        },
        defaults: {
          code: labelCode,
          value: body.label,
        },
      });

      resolve({
        err: 0,
        msg: "OK",
      });
    } catch (error) {
      reject(error);
    }
  });

export const getMyPostsService = (userId) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAndCountAll({
        where: { userId },
        raw: true,
        nest: true,
        offset: 0,
        limit: 10,
        order: [["createdAt", "DESC"]],
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone"],
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Failed to get posts",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });

export const deleteMyPostService = (postId) =>
  new Promise(async (resolve, reject) => {
    try {
      await db.Post.destroy({
        where: { id: postId },
      });
      resolve({
        err: 0,
        data: null,
      });
    } catch (error) {
      reject(error);
    }
  });

export const getPostsByCategoryService = (categoryCode) =>
  new Promise(async (resolve, reject) => {
    try {
      const response = await db.Post.findAndCountAll({
        where: { categoryCode },
        raw: true,
        nest: true,
        offset: 0,
        limit: 10,
        include: [
          { model: db.Image, as: "images", attributes: ["image"] },
          {
            model: db.Attribute,
            as: "attributes",
            attributes: ["price", "acreage", "published", "hashtag"],
          },
          {
            model: db.User,
            as: "user",
            attributes: ["name", "zalo", "phone"],
          },
        ],
        attributes: ["id", "title", "star", "address", "description"],
      });
      resolve({
        err: response ? 0 : 1,
        msg: response ? "Ok" : "Failed to get posts",
        response,
      });
    } catch (error) {
      reject(error);
    }
  });
