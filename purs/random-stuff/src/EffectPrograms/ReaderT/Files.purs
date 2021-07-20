module Files where

import Prelude

import Control.Monad.Reader (ReaderT, runReaderT)
import Effect (Effect)
import Effect.Class (class MonadEffect, liftEffect)
import Effect.Class.Console (log)
import Node.Encoding as Encoding
import Node.FS.Sync (readTextFile, writeTextFile)

newtype Filepath = Filepath String

filePathToString :: Filepath -> String
filePathToString (Filepath f) = f

class
  (Monad m) <= Files m where
  readFile :: Filepath -> m String
  writeFile :: Filepath -> Filepath -> m Unit
  copyFile :: Filepath -> Filepath -> m Unit

class (Monad m) <= Console m where
    putStrLn :: String -> m Unit

newtype AppM a
  = AppM (ReaderT Unit Effect a)

runAppM :: AppM ~> Effect
runAppM (AppM a) = runReaderT a unit

instance Files AppM where
    readFile :: Filepath -> AppM String
    readFile path = liftEffect $ readTextFile Encoding.UTF8 (filePathToString path)

    writeFile :: Filepath -> Filepath -> AppM Unit
    writeFile source dest =
        liftEffect $ writeTextFile Encoding.UTF8 (filePathToString dest) (filePathToString source)

    copyFile :: Filepath -> Filepath -> AppM Unit
    copyFile source dest = do
        toCopy <- readFile source
        writeFile (Filepath toCopy) dest

instance Console AppM where
    putStrLn :: String -> AppM Unit
    putStrLn msg = liftEffect $ log msg


filesProgram :: forall m. Files m => Console m => m Unit
filesProgram = do
    file <- readFile $ Filepath "spago.dhall"
    writeFile (Filepath  "foobar") (Filepath "test.txt")
    putStrLn file
    pure unit

copyProgram :: forall m. Files m => Filepath -> Filepath -> m Unit
copyProgram source dest = copyFile source dest

derive newtype instance Functor AppM
derive newtype instance Apply AppM
derive newtype instance Applicative AppM
derive newtype instance Bind AppM
derive newtype instance Monad AppM
derive newtype instance MonadEffect AppM
