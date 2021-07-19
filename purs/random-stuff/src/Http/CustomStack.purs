module Http.CustomStack where

import HTTPure
import HTTPure ((!@))
import Prelude
import Control.Monad.Reader (class MonadAsk, ReaderT, asks, runReaderT)
import Effect.Aff (Aff)
import Effect.Aff.Class (class MonadAff)
import Effect.Console as Console

type Env
  = { name :: String, port :: Int }

readerMiddleware ::
  Env ->
  (Request -> ReaderT Env Aff Response) ->
  Request ->
  ResponseM
readerMiddleware env r request = do
  runReaderT (r request) env

sayHello :: forall m. MonadAff m => MonadAsk Env m => Request -> m Response
sayHello _ = do
  name <- asks _.name
  ok $ "Hello, " <> name

router :: forall m. MonadAff m => MonadAsk Env m => Request -> m Response
router req@{ path } = case path !@ 0 of
  "default" -> sayHello req
  "hello" -> ok $ path !@ 1
  _ -> ok $ show path

runServer :: ServerM
runServer =
  serve 7000 (readerMiddleware { name: "makaroona", port: 7000 } router) do
    Console.log $ " ┌───────────────────────────────────────┐"
    Console.log $ " │ Server now up on port 7000            │"
    Console.log $ " └───────────────────────────────────────┘"
