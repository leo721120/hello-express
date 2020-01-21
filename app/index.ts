import * as compress from 'compression'
import * as helmet from 'helmet'
import * as cors from 'cors'
import * as express from 'express'

const job = {
    asynchronous: function <T = void>(fn: () => T | PromiseLike<T>): Promise<T> {
        return Promise.resolve().then(fn);
    },
};
export const app = express();
app.use(compress());
app.use(helmet());
app.use(cors());
app.get('/', function (req, res, next) {
    job.asynchronous(function () {
        res.status(200).json({
            text: 'str',
        });
    }).catch(next);
});
app.use(function (err: Error, req, res, next) {
    app.emit('error', err);
    res.status(500).json({
        error: {
            message: err.message,
        },
    });
} as express.ErrorRequestHandler);