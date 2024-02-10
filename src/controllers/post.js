import * as postService from "../services/post";
import removeNullFromObject from "../utils/removeNullFromObject";

export const getPosts = async (req, res) => {
  try {
    const response = await postService.getPostsService();
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at post controller: " + error,
    });
  }
};

export const getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await postService.getPostService(id);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at post controller: " + error,
    });
  }
};

export const getPostsByCategory = async (req, res) => {
  const { categoryCode } = req.params;
  try {
    const response = await postService.getPostsByCategoryService(categoryCode);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at post controller: " + error,
    });
  }
};

export const getPostsLimit = async (req, res) => {
  const { page, ...query } = req.query;
  const { priceCode, areaCode, categoryCode, provinceCode } = query;
  try {
    const response = await postService.getPostsLimitService(
      page,
      removeNullFromObject({ priceCode, areaCode, categoryCode, provinceCode })
    );
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at post controller: " + error,
    });
  }
};
export const getNewestPosts = async (req, res) => {
  try {
    const response = await postService.getNewestPostsService();
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at post controller: " + error,
    });
  }
};

export const createPost = async (req, res) => {
  const { categoryCode, userId, title, priceNumber, areaNumber, label } =
    req.body;
  if (
    !categoryCode ||
    !userId ||
    !title ||
    !priceNumber ||
    !areaNumber ||
    !label
  ) {
    return es.status(500).json({
      err: 1,
      msg: "Missing Input",
    });
  }
  try {
    const response = await postService.createPostService(req.body, userId);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at post controller: " + error,
    });
  }
};

export const getMyPostsLimit = async (req, res) => {
  const { id } = req.user;
  try {
    const response = await postService.getMyPostsService(id);
    res.status(200).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at post controller: " + error,
    });
  }
};

export const deleteMyPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const response = await postService.deleteMyPostService(postId);
    res.status(204).json(response);
  } catch (error) {
    return res.status(500).json({
      err: 1,
      msg: "Fail at post controller: " + error,
    });
  }
};
