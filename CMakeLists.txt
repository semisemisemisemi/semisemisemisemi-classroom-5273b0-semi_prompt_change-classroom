cmake_minimum_required(VERSION 3.10)

project(Calculator)

# C++14 설정
set(CMAKE_CXX_STANDARD 14)
set(CMAKE_CXX_STANDARD_REQUIRED True)

include_directories(include)
include_directories(/usr/src/googletest/googletest/include) # Google Test 경로 추가
include_directories(/usr/src/googletest/googlemock/include) # Google Mock 경로 추가

add_executable(calculator src/main.cpp src/calculator.cpp)

enable_testing()
add_executable(test_calculator test/test_calculator.cpp src/calculator.cpp)
target_link_libraries(test_calculator gtest gtest_main gmock gmock_main) # Google Test 라이브러리 링크
add_test(NAME calculator_test COMMAND test_calculator)
