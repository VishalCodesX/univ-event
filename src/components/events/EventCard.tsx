import { Calendar, MapPin, Users, Clock, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/enhanced-button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";

interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  venue: string;
  organizer: {
    name: string;
    avatar?: string;
  };
  registrations: number;
  maxCapacity: number;
  category: string;
  poster?: string;
  status: "upcoming" | "ongoing" | "completed" | "cancelled";
  isRegistered?: boolean;
}

interface EventCardProps {
  event: Event;
  userRole: "student" | "organizer" | "admin";
  onRegister?: (eventId: string) => void;
  onUnregister?: (eventId: string) => void;
  onEdit?: (eventId: string) => void;
  onView?: (eventId: string) => void;
}

export function EventCard({ event, userRole, onRegister, onUnregister, onEdit, onView }: EventCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "upcoming":
        return "bg-primary text-primary-foreground";
      case "ongoing":
        return "bg-success text-success-foreground";
      case "completed":
        return "bg-muted text-muted-foreground";
      case "cancelled":
        return "bg-destructive text-destructive-foreground";
      default:
        return "bg-secondary text-secondary-foreground";
    }
  };

  const getCategoryColor = (category: string) => {
    const colors = {
      "Technology": "bg-blue-100 text-blue-800",
      "Workshop": "bg-green-100 text-green-800",
      "Conference": "bg-purple-100 text-purple-800",
      "Seminar": "bg-orange-100 text-orange-800",
      "Sports": "bg-red-100 text-red-800",
      "Cultural": "bg-pink-100 text-pink-800",
      "Academic": "bg-indigo-100 text-indigo-800",
    };
    return colors[category as keyof typeof colors] || "bg-gray-100 text-gray-800";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="bg-gradient-card shadow-lg hover:shadow-xl transition-all duration-300 border-0 overflow-hidden">
        {/* Event Poster */}
        {event.poster && (
          <div className="relative h-48 overflow-hidden">
            <img 
              src={event.poster} 
              alt={event.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-4 left-4">
              <Badge className={getStatusColor(event.status)}>
                {event.status.charAt(0).toUpperCase() + event.status.slice(1)}
              </Badge>
            </div>
            <div className="absolute top-4 right-4">
              <Badge className={getCategoryColor(event.category)}>
                {event.category}
              </Badge>
            </div>
          </div>
        )}

        <CardHeader className="pb-3">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="text-lg font-semibold text-foreground line-clamp-2 hover:text-primary transition-colors">
                {event.title}
              </h3>
              <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                {event.description}
              </p>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Event Details */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="flex items-center text-muted-foreground">
              <Calendar className="h-4 w-4 mr-2 text-primary" />
              <span>{event.date}</span>
            </div>
            <div className="flex items-center text-muted-foreground">
              <Clock className="h-4 w-4 mr-2 text-primary" />
              <span>{event.time}</span>
            </div>
            <div className="flex items-center text-muted-foreground col-span-2">
              <MapPin className="h-4 w-4 mr-2 text-primary" />
              <span>{event.venue}</span>
            </div>
          </div>

          {/* Organizer */}
          <div className="flex items-center space-x-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={event.organizer.avatar} alt={event.organizer.name} />
              <AvatarFallback className="text-xs bg-primary text-primary-foreground">
                {event.organizer.name.split(" ").map(n => n[0]).join("").toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm text-muted-foreground">
              Organized by {event.organizer.name}
            </span>
          </div>

          {/* Registration Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center text-sm text-muted-foreground">
              <Users className="h-4 w-4 mr-2 text-primary" />
              <span>{event.registrations}/{event.maxCapacity} registered</span>
            </div>
            <div className="w-full max-w-24 ml-4">
              <div className="bg-secondary rounded-full h-2">
                <div 
                  className="bg-primary h-2 rounded-full transition-all duration-500"
                  style={{ width: `${(event.registrations / event.maxCapacity) * 100}%` }}
                />
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between pt-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => onView?.(event.id)}
              className="flex-1 mr-2"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              View Details
            </Button>

            {userRole === "student" && (
              <>
                {event.isRegistered ? (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onUnregister?.(event.id)}
                    className="text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground"
                  >
                    Unregister
                  </Button>
                ) : (
                  <Button
                    variant="hero"
                    size="sm"
                    onClick={() => onRegister?.(event.id)}
                    disabled={event.registrations >= event.maxCapacity || event.status !== "upcoming"}
                  >
                    Register
                  </Button>
                )}
              </>
            )}

            {(userRole === "organizer" || userRole === "admin") && (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => onEdit?.(event.id)}
              >
                Edit
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}