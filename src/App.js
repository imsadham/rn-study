import React, { useRef, useState } from "react";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Animated,
  Dimensions
} from "react-native";

const BoardingContent = [
  {
    avatar: "",
    title: "What is Lorem Ipsum?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    avatar: "",
    title: "Why do we use it?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  },
  {
    avatar: "",
    title: "Where does it come from?",
    description:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry."
  }
];

const { width } = Dimensions.get("window");

function App() {
  const scrollX = useRef(new Animated.Value(0)).current;
  const flatListRef = useRef();

  const [currentIndex, setCurrentIndex] = useState(0);

  const onViewChangeRef = useRef(({ viewableItems, changed }) => {
    console.log("viewable:", viewableItems);
    setCurrentIndex(viewableItems[0]?.index);
  });

  const RenderBoardScreen = ({ data }) => {
    return (
      <View
        style={{
          width: width,
          // flex: 1,
          height: "90%",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <Text>{data.title}</Text>
      </View>
    );
  };

  const Dots = () => {
    const dotPosition = Animated.divide(scrollX, width);
    return (
      <View style={{ flexDirection: "row" }}>
        {BoardingContent.map((item, index) => {
          const dotColor = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: ["#ffb885", "#ff6e07", "#ffb885"],
            extrapolate: "clamp"
          });
          const dotWidth = dotPosition.interpolate({
            inputRange: [index - 1, index, index + 1],
            outputRange: [10, 30, 10],
            extrapolate: "clamp"
          });
          return (
            <Animated.View
              style={{
                width: dotWidth,
                height: 10,
                backgroundColor: dotColor,
                borderRadius: 5,
                marginHorizontal: 5
              }}
            ></Animated.View>
          );
        })}
      </View>
    );
  };
  const renderFooter = () => {
    return (
      <View
        style={{
          // height: 100,
          width: "100%",
          alignItems: "center",
          flex: 1
        }}
      >
        <View style={{ flex: 1, justifyContent: "center" }}>
          <Dots />
        </View>
        <View
          style={{
            flex: 1,
            width: "100%",
            flexDirection: "row",
            justifyContent: "space-between"
          }}
        >
          <Pressable
            style={{ width: 100, padding: 10, backgroundColor: "yellow" }}
          >
            <Text>Previous</Text>
          </Pressable>
          {currentIndex < BoardingContent?.length ? (
            <Pressable
              style={{
                width: 100,
                padding: 10,
                backgroundColor: "#008B8B",
                color: "#fff"
              }}
              onPress={() => {
                let index = Math.ceil(Number(scrollX._value / width));

                if (index < BoardingContent.length) {
                  flatListRef.current.scrollToIndex({
                    index: index + 1,
                    animated: true
                  });
                } else {
                  // navigat
                }
              }}
            >
              <Text>Next</Text>
            </Pressable>
          ) : (
            <Pressable>
              <Text>Login</Text>
            </Pressable>
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.app}>
      <Animated.FlatList
        ref={flatListRef}
        horizontal
        pagingEnabled
        data={BoardingContent}
        scrollEventThrottle={16}
        snapToAlignment="center"
        showHorizontalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { userNativeDriver: false }
        )}
        onViewableItemsChanged={onViewChangeRef.current}
        keyExtractor={(item) => `${item.name}`}
        renderItem={({ item, index }) => {
          return <RenderBoardScreen data={item} />;
        }}
      ></Animated.FlatList>
      <View style={{ width: "100%", height: 100 }}>{renderFooter()}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  app: {
    marginHorizontal: "auto",
    width: "100%",
    // flex: 1,
    height: "80%"
  },
  logo: {
    height: 80
  },
  header: {
    padding: 20
  },
  title: {
    fontWeight: "bold",
    fontSize: "1.5rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  text: {
    lineHeight: "1.5em",
    fontSize: "1.125rem",
    marginVertical: "1em",
    textAlign: "center"
  },
  link: {
    color: "#1B95E0"
  },
  code: {
    fontFamily: "monospace, monospace"
  }
});

export default App;
