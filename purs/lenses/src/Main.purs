module Main where

import Data.Tuple (Tuple(..))
import Prelude
import Data.Array (range)
import Data.Foldable (traverse_)
import Data.Lens (Lens', Traversal', _2, _Just, over, traversed, view)
import Data.Lens.At (at)
import Data.Lens.Record (prop)
import Data.Map (Map)
import Data.Map as M
import Data.Maybe (Maybe, fromMaybe)
import Data.Symbol (SProxy(..))
import Effect (Effect)
import Effect.Console (log)

main :: Effect Unit
main = do
  let
    testTuple = Tuple 5 "six"

    testRec = { name: "Joona", age: 22 }

    testMap = M.fromFoldable [ Tuple "Tim" "foobar" ]

    res = view _2 testTuple

    res2 = view _name testRec

    res3 = testTuple # view _2 <<< modifySnd (_ <> " foobar")

    res4 = testRec # getName <<< modifyName (\name -> name <> " " <> "Piirainen")

    res5 = view _age testRec

    res6 = fromMaybe "" $ getTim testMap

    res7 = testMap # fromMaybe "" <<< getTim <<< updateTim (\t -> t <> " is awesome! ")

    res8 = show $ over traversed (\x -> show $ x * 2) (range 1 10)
  traverse_ log [ res, res2, res3, res4, res6, res7, res8 ]
  log $ "age >>> " <> show res5
  pure unit

getName :: forall a r. { name :: a | r } -> a
getName = view _name

_name :: forall a r. Lens' { name :: a | r } a
_name = prop (SProxy :: SProxy "name")

_age :: forall a r. Lens' { age :: a | r } a
_age = prop (SProxy :: SProxy "age")

modifySnd :: forall a b. (b -> b) -> Tuple a b -> Tuple a b
modifySnd = over _2

modifyName ::
  forall a r.
  (a -> a) ->
  { name :: a | r } ->
  { name :: a
  | r
  }
modifyName = over _name

_Tim :: forall a. Lens' (Map String a) (Maybe a)
_Tim = at "Tim"

getTim :: forall a. Map String a -> Maybe a
getTim = view _Tim

updateTim :: forall a. (a -> a) -> Map String a -> Map String a
updateTim f = over _Tim $ map f

_city :: forall a r. Traversal' (Maybe { city :: Maybe a | r }) a
_city = _Just <<< prop (SProxy :: SProxy "city") <<< _Just
