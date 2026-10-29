import cors from "cors";

const allowedOrigins = (
	process.env.ALLOWED_ORIGINS ||
	"http://localhost:3000,http://localhost:3001"
)
	.split(",")
	.map((origin) => origin.trim())
	.filter(Boolean);

const corsHandler = cors({
	origin: (origin, callback) => {
		if (!origin || allowedOrigins.includes(origin)) {
			return callback(null, true);
		}

		return callback(null, false);
	},
	credentials: true,
});

const corsMiddleware = (req, res, next) =>
	corsHandler(req, res, (error) => {
		if (error) {
			return next(error);
		}

		if (
			req.method === "OPTIONS" &&
			req.headers.origin &&
			!allowedOrigins.includes(req.headers.origin)
		) {
			return res.sendStatus(204);
		}

		return next();
	});

export default corsMiddleware;
