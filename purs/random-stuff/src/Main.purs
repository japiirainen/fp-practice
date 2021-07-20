module Main where

import Data.Function (($))
import Data.Unit (Unit)
import Effect (Effect)
import Files (Filepath(..), copyProgram, runAppM)

main :: Effect Unit
main = runAppM $ copyProgram source dest
  where
  source = Filepath "spago.dhall"

  dest = Filepath "copy-spago.dhall"
