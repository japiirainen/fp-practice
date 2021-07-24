{-# LANGUAGE OverloadedStrings #-}
{-# LANGUAGE RecordWildCards   #-}
module Lib where

import           Control.Monad              (void)
import           Data.Text                  (Text)
import qualified Data.Text                  as T
import           Data.Void                  (Void)
import           Text.Megaparsec
import           Text.Megaparsec.Char       (alphaNumChar, char, string)
import           Text.Megaparsec.Char.Lexer (decimal)

data Scheme
    = SchemeData
    | SchemeFile
    | SchemeFtp
    | SchemeHttp
    | SchemeHttps
    | SchemeIrc
    | SchemeMailto
    deriving (Eq, Show)

data Uri = Uri
    { uriScheme    :: Scheme
    , uriAuthority :: Maybe Authority
    } deriving (Eq, Show)

data Authority = Authority
    { authUser :: Maybe (Text, Text)
    , authHost :: Text
    , authPort :: Maybe Int
    } deriving (Eq, Show)

type Parser = Parsec Void Text

pScheme :: Parser Scheme
pScheme = choice
    [ SchemeData <$ string "data"
    , SchemeFile <$ string "file"
    , SchemeFtp <$ string "ftp"
    , SchemeHttps <$ string "https"
    , SchemeHttp <$ string "http"
    , SchemeIrc <$ string "irc"
    , SchemeMailto <$ string "mailto"
    ]

pUri :: Parser Uri
pUri = do
    uriScheme <- pScheme
    void (char ':')
    uriAuthority <- optional . try $ do
        void (string "//")
        authUser <- optional . try $ do
            user <- T.pack <$> some alphaNumChar
            void (char ':')
            password <- T.pack <$> some alphaNumChar
            void (char '@')
            pure (user, password)
        authHost <- T.pack <$> some (alphaNumChar <|> char '.')
        authPort <- optional (char ':' *> decimal)
        pure Authority {..}
    pure Uri {..}
