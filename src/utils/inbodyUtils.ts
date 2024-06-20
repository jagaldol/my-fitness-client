export function standardWeight(height: number, gender: number) {
  return (height / 100) ** 2 * (gender === 1 ? 21 : 22) // 신장 제곱 * 22(이상적인 BMI | 여자 21)
}

export function standardMuscle(height: number, gender: number) {
  return standardWeight(height, gender) * (gender === 1 ? 0.42 : 0.47) // 표준 체중의 45%(여자 35%)
}
