import { useState, useEffect } from "react";
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle, 
  CardFooter 
} from "@/components/ui/card";
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
import { useVouchers } from "@/hooks/use-vouchers";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { queryClient } from "@/lib/queryClient";
import { X } from "lucide-react";

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
  const { vouchers, isLoading, refetch } = useVouchers(selectedGame);
  const { toast } = useToast();

  // When game type changes, reset card selection
  useEffect(() => {
    setSelectedVoucherId("");
    setAmount("");
    setBonus("");
    setPrice("");
  }, [selectedGame]);

  // When card selection changes, populate fields
  useEffect(() => {
    if (selectedVoucherId && vouchers) {
      const selectedVoucher = vouchers.find(v => v.id.toString() === selectedVoucherId);
      if (selectedVoucher) {
        setAmount(selectedVoucher.amount.toString());
        setBonus(selectedVoucher.bonus.toString());
        setPrice(selectedVoucher.price ? selectedVoucher.price.toString() : "0");
      }
    }
  }, [selectedVoucherId, vouchers]);

  // Format game type for display
  const formatGameType = (type: string): string => {
    return type.charAt(0).toUpperCase() + type.slice(1);
  };

  // Format voucher label
  const formatVoucherLabel = (voucher: any): string => {
    const amountInK = (voucher.amount / 1000).toFixed(0);
    return `${amountInK}K ${voucher.currency} (${voucher.bonus} Bonus)`;
  };

  const handleSave = async () => {
    if (!selectedVoucherId || !amount || !bonus || !price) {
      toast({
        variant: "destructive",
        title: "Validation Error",
        description: "Please fill in all fields",
      });
      return;
    }

    try {
      await apiRequest("PUT", `/api/vouchers/${selectedVoucherId}`, {
        amount: Number(amount),
        bonus: Number(bonus),
        price: Number(price),
      });

      toast({
        title: "Success",
        description: "Voucher updated successfully",
      });

      // Invalidate and refetch queries to update UI
      queryClient.invalidateQueries({ queryKey: ["/api/vouchers"] });
      refetch();
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Update Failed",
        description: "There was an error updating the voucher.",
      });
    }
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
          <span className="bg-purple-500/20 p-1 rounded">🔒</span> Admin Panel
        </CardTitle>
      </CardHeader>
      
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label className="block text-sm font-medium mb-1">Game Selection</Label>
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
          
          <div>
            <Label className="block text-sm font-medium mb-1">Card Selection</Label>
            <Select 
              value={selectedVoucherId} 
              onValueChange={setSelectedVoucherId}
              disabled={isLoading || !vouchers || vouchers.length === 0}
            >
              <SelectTrigger className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded">
                <SelectValue placeholder="Select card" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {vouchers && vouchers.map((voucher) => (
                    <SelectItem key={voucher.id} value={voucher.id.toString()}>
                      {formatVoucherLabel(voucher)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label className="block text-sm font-medium mb-1">
              Amount ({selectedGame === 'crossfire' ? 'ZP' : 
                     selectedGame === 'pubg' ? 'UC' : 'Diamonds'})
            </Label>
            <Input 
              type="number" 
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded text-white" 
              placeholder="5000"
              disabled={!selectedVoucherId}
            />
          </div>
          
          <div>
            <Label className="block text-sm font-medium mb-1">Bonus</Label>
            <Input 
              type="number" 
              value={bonus}
              onChange={(e) => setBonus(e.target.value)}
              className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded text-white" 
              placeholder="120"
              disabled={!selectedVoucherId}
            />
          </div>
          
          <div>
            <Label className="block text-sm font-medium mb-1">
              <span className="flex items-center gap-1">
                Sale Price <span className="text-green-500">(ج.م)</span>
              </span>
            </Label>
            <Input 
              type="number" 
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded text-white" 
              placeholder="75"
              disabled={!selectedVoucherId}
            />
          </div>
          
          <div className="md:col-span-2">
            <Label className="block text-sm font-medium mb-1">Generated Description</Label>
            <Input 
              type="text" 
              readOnly
              value={`${selectedGame} card ${price ? (Number(price)/1000).toFixed(0) : '0'}k + ${bonus || '0'} ${selectedGame === 'crossfire' ? 'zp' : selectedGame === 'pubg' ? 'UC' : 'Diamonds'} bonus`}
              className="w-full bg-gray-800 border border-purple-900 hover:border-purple-700 rounded text-white font-mono text-sm" 
            />
          </div>
        </div>
      </CardContent>
      
      <CardFooter className="flex justify-end">
        <Button 
          className="gaming-btn bg-purple-600 hover:bg-purple-700 text-white"
          onClick={handleSave}
          disabled={!selectedVoucherId || !price || !bonus}
        >
          Save Changes
        </Button>
      </CardFooter>
    </Card>
  );
}
