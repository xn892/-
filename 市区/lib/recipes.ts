export type Recipe = {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string;
  difficulty: "简单" | "中等" | "进阶";
  time: string;
  servings: number;
  calories: number;
  tags: string[];
  ingredients: { name: string; amount: string }[];
  steps: { text: string; tip?: string; image?: string }[];
  likes: number;
  rating: number;
  author: string;
  videoId: string;
  videoTitle: string;
};

export const categories = ["全部", "家常菜", "快手菜", "烘焙", "汤羹", "素食", "减脂"];

function ytThumb(id: string) {
  return `https://img.youtube.com/vi/${id}/hqdefault.jpg`;
}

export const recipes: Recipe[] = [
  {
    id: "1",
    title: "番茄炒蛋",
    description: "国民经典，酸甜开胃，十分钟搞定一桌饭。",
    image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=800&q=80",
    category: "家常菜",
    difficulty: "简单",
    time: "10分钟",
    servings: 2,
    calories: 280,
    tags: ["下饭菜", "新手友好"],
    author: "小高姐",
    rating: 4.9,
    videoId: "k_YkQSTvjLk",
    videoTitle: "番茄炒蛋 · 小高姐经典教学",
    ingredients: [
      { name: "鸡蛋", amount: "3个" },
      { name: "番茄", amount: "2个" },
      { name: "葱花", amount: "适量" },
      { name: "盐", amount: "1/2茶匙" },
      { name: "糖", amount: "1/4茶匙" },
      { name: "食用油", amount: "2汤匙" },
    ],
    steps: [
      { text: "番茄洗净切块，鸡蛋打散加少许盐。", tip: "番茄可先用开水烫一下更好去皮", image: "https://images.unsplash.com/photo-1596797038530-2c107229654b?w=600&q=80" },
      { text: "热锅多油，倒入蛋液，快速划散至八成熟盛出。", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80" },
      { text: "留底油炒番茄至出汁，加盐和糖调味。", image: "https://images.unsplash.com/photo-1546549032-9571bd6b27c3?w=600&q=80" },
      { text: "倒回鸡蛋翻炒均匀，撒葱花出锅。", image: "https://img.youtube.com/vi/k_YkQSTvjLk/hqdefault.jpg" },
    ],
    likes: 12840,
  },
  {
    id: "2",
    title: "蒜香黄油虾",
    description: "外焦里嫩，蒜香浓郁，宴客级硬菜。",
    image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=800&q=80",
    category: "快手菜",
    difficulty: "简单",
    time: "15分钟",
    servings: 3,
    calories: 320,
    tags: ["海鲜", "西式"],
    author: "Gordon Ramsay",
    rating: 4.8,
    videoId: "jBVTMuNrCCE",
    videoTitle: "蒜香黄油大虾 · 西式煎虾教学",
    ingredients: [
      { name: "大虾", amount: "400g" },
      { name: "黄油", amount: "30g" },
      { name: "大蒜", amount: "6瓣" },
      { name: "白葡萄酒", amount: "2汤匙" },
      { name: "黑胡椒", amount: "适量" },
      { name: "欧芹", amount: "少许" },
    ],
    steps: [
      { text: "大虾去虾线，用厨房纸吸干水分。", image: "https://images.unsplash.com/photo-1565680018434-b513d5e5fd47?w=600&q=80" },
      { text: "中火融化黄油，下蒜末炒香至金黄。", image: "https://images.unsplash.com/photo-1606491956689-2ea86685817e?w=600&q=80" },
      { text: "放入大虾两面各煎2分钟至变红。", image: "https://images.unsplash.com/photo-1559847844-d72142617993?w=600&q=80" },
      { text: "淋入白葡萄酒，撒黑胡椒和欧芹，翻匀即可。", image: ytThumb("jBVTMuNrCCE") },
    ],
    likes: 9650,
  },
  {
    id: "3",
    title: "日式味噌汤",
    description: "温暖治愈的一碗汤，搭配米饭完美。",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=800&q=80",
    category: "汤羹",
    difficulty: "简单",
    time: "20分钟",
    servings: 4,
    calories: 85,
    tags: ["低卡", "暖胃"],
    author: "Just One Cookbook",
    rating: 4.7,
    videoId: "NQ0E-RTnr_I",
    videoTitle: "正宗日式味噌汤 · 从零开始",
    ingredients: [
      { name: "味噌", amount: "2汤匙" },
      { name: "豆腐", amount: "1块" },
      { name: "海带", amount: "10g" },
      { name: "木鱼花", amount: "1小把" },
      { name: "葱花", amount: "适量" },
    ],
    steps: [
      { text: "海带冷水浸泡30分钟，小火煮15分钟做底汤。", image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=600&q=80" },
      { text: "加入木鱼花煮1分钟后过滤。", image: "https://images.unsplash.com/photo-1606491956689-2ea86685817e?w=600&q=80" },
      { text: "豆腐切小块放入汤中，味噌用少量汤化开再倒回。", image: "https://images.unsplash.com/photo-1582450871972-ab325ca8f5b5?w=600&q=80" },
      { text: "切勿沸腾，撒葱花即可。", image: ytThumb("NQ0E-RTnr_I") },
    ],
    likes: 5420,
  },
  {
    id: "4",
    title: "经典提拉米苏",
    description: "意式甜品之王，咖啡与马斯卡彭的完美邂逅。",
    image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=800&q=80",
    category: "烘焙",
    difficulty: "进阶",
    time: "4小时",
    servings: 6,
    calories: 420,
    tags: ["甜品", "聚会"],
    author: "Preppy Kitchen",
    rating: 4.9,
    videoId: "ND8XkEnP760",
    videoTitle: "经典提拉米苏 · 免烤版教学",
    ingredients: [
      { name: "马斯卡彭", amount: "250g" },
      { name: "手指饼干", amount: "200g" },
      { name: "浓 espresso", amount: "200ml" },
      { name: "蛋黄", amount: "3个" },
      { name: "可可粉", amount: "适量" },
    ],
    steps: [
      { text: "蛋黄加糖打发至浓稠，拌入马斯卡彭。", image: "https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?w=600&q=80" },
      { text: "手指饼干快速蘸咖啡液，铺一层。", image: "https://images.unsplash.com/photo-1551024506-0bccd8281a77?w=600&q=80" },
      { text: "覆盖一层奶酪糊，重复两层。", image: "https://images.unsplash.com/photo-1488477181946-6428a0291777?w=600&q=80" },
      { text: "冷藏4小时以上，食用前筛可可粉。", image: ytThumb("ND8XkEnP760") },
    ],
    likes: 18700,
  },
  {
    id: "5",
    title: "清炒时蔬",
    description: "保留蔬菜本味，健康轻食首选。",
    image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=800&q=80",
    category: "素食",
    difficulty: "简单",
    time: "8分钟",
    servings: 2,
    calories: 120,
    tags: ["素食", "低卡"],
    author: "美食台",
    rating: 4.6,
    videoId: "RzpOU70L8XM",
    videoTitle: "清炒时蔬 · 保持脆嫩技巧",
    ingredients: [
      { name: "混合时蔬", amount: "400g" },
      { name: "蒜片", amount: "3瓣" },
      { name: "盐", amount: "适量" },
      { name: "橄榄油", amount: "1汤匙" },
    ],
    steps: [
      { text: "时蔬洗净沥干，根茎类先下锅。", image: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&q=80" },
      { text: "大火快炒，保持锅气。", image: "https://images.unsplash.com/photo-1606491956689-2ea86685817e?w=600&q=80" },
      { text: "叶菜后放，加盐调味，30秒内出锅。", image: ytThumb("RzpOU70L8XM") },
    ],
    likes: 3210,
  },
  {
    id: "6",
    title: "鸡胸肉沙拉碗",
    description: "高蛋白低碳水，健身餐也能很美味。",
    image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800&q=80",
    category: "减脂",
    difficulty: "中等",
    time: "25分钟",
    servings: 1,
    calories: 380,
    tags: ["健身", "高蛋白"],
    author: "Fit Men Cook",
    rating: 4.8,
    videoId: "TUUUvJ9l8Ec",
    videoTitle: "高蛋白鸡胸肉沙拉碗",
    ingredients: [
      { name: "鸡胸肉", amount: "150g" },
      { name: "混合生菜", amount: "100g" },
      { name: "小番茄", amount: "6颗" },
      { name: "牛油果", amount: "半个" },
      { name: "油醋汁", amount: "2汤匙" },
    ],
    steps: [
      { text: "鸡胸肉用盐和黑胡椒腌制，煎至两面金黄。", image: "https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=600&q=80" },
      { text: "生菜洗净撕小块，番茄对半切。", image: "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=600&q=80" },
      { text: "切片鸡胸肉，牛油果切块。", image: "https://images.unsplash.com/photo-1525351484163-7529414344d8?w=600&q=80" },
      { text: "所有食材摆盘，淋油醋汁。", image: ytThumb("TUUUvJ9l8Ec") },
    ],
    likes: 7890,
  },
  {
    id: "7",
    title: "红烧肉",
    description: "肥而不腻、入口即化，家的味道。",
    image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=800&q=80",
    category: "家常菜",
    difficulty: "中等",
    time: "90分钟",
    servings: 4,
    calories: 560,
    tags: ["硬菜", "下饭"],
    author: "美食作家王刚",
    rating: 4.9,
    videoId: "h5oLanlWu_o",
    videoTitle: "红烧肉 · 经典家常做法",
    ingredients: [
      { name: "五花肉", amount: "600g" },
      { name: "冰糖", amount: "30g" },
      { name: "生抽", amount: "3汤匙" },
      { name: "老抽", amount: "1汤匙" },
      { name: "料酒", amount: "2汤匙" },
      { name: "八角", amount: "2颗" },
    ],
    steps: [
      { text: "五花肉切块焯水去血沫。", image: "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?w=600&q=80" },
      { text: "炒糖色至琥珀色，下肉块翻炒上色。", image: "https://images.unsplash.com/photo-1606491956689-2ea86685817e?w=600&q=80" },
      { text: "加料酒、生抽、老抽和香料，加水没过肉。", image: "https://images.unsplash.com/photo-1546549032-9571bd6b27c3?w=600&q=80" },
      { text: "小火焖60-75分钟至软烂，大火收汁。", image: ytThumb("h5oLanlWu_o") },
    ],
    likes: 22100,
  },
  {
    id: "8",
    title: "葱油拌面",
    description: "五分钟搞定，葱香四溢的深夜治愈。",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=800&q=80",
    category: "快手菜",
    difficulty: "简单",
    time: "5分钟",
    servings: 1,
    calories: 450,
    tags: ["面食", "夜宵"],
    author: "小高姐",
    rating: 4.8,
    videoId: "gE-kq2l8nqs",
    videoTitle: "葱油拌面 · 上海经典做法",
    ingredients: [
      { name: "细面", amount: "150g" },
      { name: "小葱", amount: "1把" },
      { name: "生抽", amount: "2汤匙" },
      { name: "老抽", amount: "1/2汤匙" },
      { name: "糖", amount: "1茶匙" },
    ],
    steps: [
      { text: "小葱切段，冷油小火慢炸至焦黄。", image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=600&q=80" },
      { text: "面条煮熟过凉水沥干。", image: "https://images.unsplash.com/photo-1612874747227-408994a2b636?w=600&q=80" },
      { text: "调汁：生抽、老抽、糖、2汤匙葱油。", image: "https://images.unsplash.com/photo-1606491956689-2ea86685817e?w=600&q=80" },
      { text: "面条拌汁，撒炸葱段即可。", image: ytThumb("gE-kq2l8nqs") },
    ],
    likes: 15600,
  },
];

export function getRecipe(id: string): Recipe | undefined {
  return recipes.find((r) => r.id === id);
}

export function getTopRecipes(limit = 5) {
  return [...recipes].sort((a, b) => b.likes - a.likes).slice(0, limit);
}

export function getRelatedRecipes(id: string, limit = 3) {
  const current = getRecipe(id);
  if (!current) return [];
  return recipes
    .filter((r) => r.id !== id && r.category === current.category)
    .slice(0, limit);
}
