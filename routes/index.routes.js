import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Hello 3267rer");
});

router.get("/ping", (req, res) => {
  res.send("pong");
});

export default router;
