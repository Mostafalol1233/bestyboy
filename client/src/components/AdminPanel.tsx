import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Select, 
  SelectContent, 
  SelectGroup, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useVouchers } from "@/contexts/VoucherContext";
import { useToast } from "@/hooks/use-toast";
import { X, Save, Plus, Trash } from "lucide-react";
import { Voucher } from "@shared/schema";

interface AdminPanelProps {
  onClose: () => void;
  gameTypes: string[];
  activeGame: string;
}

export default function AdminPanel({ onClose, gameTypes, activeGame }: AdminPanelProps) {
  const [selectedGame, setSelectedGame] = useState(activeGame);
  const [selectedVoucherId, setSelectedVoucherId] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [bonus, setBonus] = useState<string>("");
  const [price, setPrice] = useState<string>("");
  const [isAdding, setIsAdding] = useState(false);
  
  const { vouchers, getVouchersByGameType, updateVoucher, addVoucher, deleteVoucher } = useVouchers();
  const gameVouchers = getVouchersByGameType(selectedGame);
  const { toast } = useToast();

  // When game type changes, reset card selection
  useEffect(() => {
    setSelectedVoucherId("");
    setAmount("");
    setBonus("");
    setPrice("");
    setIsAdding(false);
  }, [selectedGame]);

  // When card selection changes, populate fields
  useEffect(() => {
    if (selectedVoucherId && gameVouchers) {
      const selectedVoucher = gameVouchers.find(v => v.id.toString() === selectedVoucherId);
      if (selectedVoucher) {
        setAmount(selectedVoucher.amount.toString());
        setBonus(selectedVoucher.bonus.toString());
        setPrice(selectedVoucher.price.toString());
      }
    }
  }, [selectedVoucherId, gameVouchers]);

  // Format game type for display
  const formatGameType = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Format voucher label
  const formatVoucherLabel = (voucher: Voucher): string => {
    const amountInK = (voucher.amount / 1000).toFixed(0);
    const bonusInK = (voucher.bonus / 1000).toFixed(0);
    return `${amountInK}K ${voucher.currency} (${bonusInK}K Bonus)`;
  };

  // Update existing voucher
  const handleSave = () => {
    if (!amount || !bonus || !price) {
      toast({
        variant: "destructive",
        title: "خطأ في التحقق",
        description: "يرجى ملء جميع الحقول المطلوبة",
      });
      return;
    }

    try {
      if (isAdding) {
        // Add new voucher
        const newVoucher = {
          gameType: selectedGame,
          amount: Number(amount),
          bonus: Number(bonus),
          price: Number(price),
          currency: selectedGame === 'crossfire' ? 'ZP' : 
                   selectedGame === 'pubg' ? 'UC' : 'Diamonds',
          imageUrl: "/attached_assets/image_1747412665992.png",
        };
        
        addVoucher(newVoucher);
        
        toast({
          title: "تم بنجاح",
          description: "تمت إضافة القسيمة الجديدة بنجاح",
        });
        
        // Reset form for next entry
        setAmount("");
        setBonus("");
        setPrice("");
        
      } else if (selectedVoucherId) {
        // Update existing voucher
        updateVoucher(Number(selectedVoucherId), {
          amount: Number(amount),
          bonus: Number(bonus),
          price: Number(price),
        });
        
        toast({
          title: "تم بنجاح",
          description: "تم تحديث القسيمة بنجاح",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "فشل التحديث",
        description: "حدث خطأ أثناء تحديث القسيمة.",
      });
      console.error(error);
    }
  };
  
  // Delete a voucher
  const handleDelete = () => {
    if (!selectedVoucherId) return;
    
    try {
      deleteVoucher(Number(selectedVoucherId));
      
      toast({
        title: "تم بنجاح",
        description: "تم حذف القسيمة بنجاح",
      });
      
      // Reset form
      setSelectedVoucherId("");
      setAmount("");
      setBonus("");
      setPrice("");
      
    } catch (error) {
      toast({
        variant: "destructive",
        title: "فشل الحذف",
        description: "حدث خطأ أثناء حذف القسيمة.",
      });
      console.error(error);
    }
  };
  
  // Switch to add mode
  const startAddingVoucher = () => {
    setIsAdding(true);
    setSelectedVoucherId("");
    setAmount("");
    setBonus("");
    setPrice("");
  };
  
  // Cancel adding new voucher
  const cancelAddingVoucher = () => {
    setIsAdding(false);
    setAmount("");
    setBonus("");
    setPrice("");
  };

  return (
    <Card className="admin-panel bg-secondary mb-6 relative border border-purple-600 shadow-[0_0_15px_rgba(124,58,237,0.3)] neon-border">
      <Button 
        variant="ghost" 
        size="icon" 
        className="absolute right-2 top-2 text-red-400 hover:text-red-300"
        onClick={onClose}
      >
        <X className="h-4 w-4" />
      </Button>
      
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-orbitron font-semibold text-purple-400 neon-text flex items-center gap-2">
          <span className="bg-purple-500/20 p-1 rounded">🔒</span> لوحة المشرف
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="mb-4">
          <Label className="block text-sm font-medium mb-1">اختر اللعبة</Label>
          <Select value={selectedGame} onValueChange={setSelectedGame}>
            <SelectTrigger className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded">
              <SelectValue placeholder="Select game" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {gameTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {formatGameType(type)}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        {!isAdding && (
          <div className="mb-4">
            <div className="flex justify-between items-center">
              <Label className="block text-sm font-medium mb-1">اختر القسيمة</Label>
              <Button 
                variant="ghost" 
                size="sm"
                className="text-green-400 hover:text-green-300 -mt-1"
                onClick={startAddingVoucher}
              >
                <Plus className="h-4 w-4 mr-1" /> إضافة جديدة
              </Button>
            </div>
            <Select 
              value={selectedVoucherId} 
              onValueChange={setSelectedVoucherId}
              disabled={!gameVouchers || gameVouchers.length === 0}
            >
              <SelectTrigger className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded">
                <SelectValue placeholder="اختر القسيمة" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {gameVouchers && gameVouchers.map((voucher) => (
                    <SelectItem key={voucher.id} value={voucher.id.toString()}>
                      {formatVoucherLabel(voucher)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
        )}
        
        {(isAdding || selectedVoucherId) && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <Label className="block text-sm font-medium mb-1">
                  القيمة ({selectedGame === 'crossfire' ? 'ZP' : 
                        selectedGame === 'pubg' ? 'UC' : 'Diamonds'})
                </Label>
                <Input 
                  type="number" 
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded text-white" 
                  placeholder="5000"
                />
              </div>
              
              <div>
                <Label className="block text-sm font-medium mb-1">المكافأة</Label>
                <Input 
                  type="number" 
                  value={bonus}
                  onChange={(e) => setBonus(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded text-white" 
                  placeholder="2500"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label className="block text-sm font-medium mb-1">
                  <span className="flex items-center gap-1">
                    سعر البيع <span className="text-green-500">(ج.م)</span>
                  </span>
                </Label>
                <Input 
                  type="number" 
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded text-white" 
                  placeholder="120"
                />
              </div>
            </div>
            
            <div className="mt-4 flex justify-between">
              {isAdding ? (
                <>
                  <Button 
                    variant="outline"
                    className="border-gray-600 text-gray-400 hover:text-gray-300"
                    onClick={cancelAddingVoucher}
                  >
                    إلغاء
                  </Button>
                  <Button 
                    className="gaming-btn bg-green-600 hover:bg-green-700 text-white flex items-center gap-2"
                    onClick={handleSave}
                    disabled={!amount || !bonus || !price}
                  >
                    <Plus size={16} /> إضافة قسيمة
                  </Button>
                </>
              ) : (
                <>
                  <Button 
                    variant="outline"
                    className="border-red-600 text-red-400 hover:text-red-300 flex items-center gap-2"
                    onClick={handleDelete}
                    disabled={!selectedVoucherId}
                  >
                    <Trash size={16} /> حذف
                  </Button>
                  <Button 
                    className="gaming-btn bg-purple-600 hover:bg-purple-700 text-white flex items-center gap-2"
                    onClick={handleSave}
                    disabled={!selectedVoucherId || !amount || !bonus || !price}
                  >
                    <Save size={16} /> حفظ التغييرات
                  </Button>
                </>
              )}
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}