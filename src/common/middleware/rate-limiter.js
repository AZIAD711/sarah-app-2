import rateLimit from "express-rate-limit";

    export const createRateLimiter = ({
        windowMs = 15 * 60 * 1000,
        max = 100,
        message = "Too many requests, please try again later.",
        standardHeaders = "draft-8",
        legacyHeaders = false,
        skipSuccessfulRequests = false,
        skipFailedRequests = false,
        keyGenerator,
        skip
    } = {}) => {

        return rateLimit({
            windowMs,
            max,
            standardHeaders,
            legacyHeaders,
            skipSuccessfulRequests,
            skipFailedRequests,
            keyGenerator,
            skip,

            handler: (req, res) => {
                return res.status(429).json({
                    success: false,
                    statusCode: 429,
                    message,
                    retryAfter: Math.ceil(windowMs / 1000)
                });
            }
        });
    };